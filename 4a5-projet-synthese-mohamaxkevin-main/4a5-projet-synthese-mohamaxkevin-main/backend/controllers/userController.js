const User = require('../models/User') ;
const HttpError = require('../util/HttpError') ;
const jwt = require('jsonwebtoken');


const getUsers = async (req, res, next) => {

    try {
        const users = await User.find({}, "-password").populate({
          path : 'reviews',
          select : 'rating comment'
        }) ;
        if(users.length === 0) {
            return next(new HttpError("Aucun utilisateur.", 404));
        } 
        res.status(200).json(
            {users : users.map((user) => {
                return user.toObject({getters : true}) ;
            })}
        )
        

    } catch (err) {
        return next(new HttpError("Erreur survenue, veuillez réessayer plus tard", 500)) ;
    }

} ;

const signUpUser = async (req, res ,next) => {
    const {nom, prenom, email, password} = req.body ;
    console.log(nom) ;
    console.log(prenom) ;
    console.log(email) ;
    let hasUser ;
    try {
        hasUser = await User.findOne({email : email}) ;
        if(hasUser) {
            return next(new HttpError("Utilisateur existant", 422));
        }
    } catch(err) {
        return next(new HttpError("Erreur survenue, veuillez réessayer plus tard", 500)) ;
    }

    // A FAIRE Verif par email : Avoir un email valide est nécessaire pour l'envoi des confirmations etc (A FAIRE ??)

    const createdUser = new User({
        nom,
        prenom,
        email,
        password,
        reviews : [],
        locationsEnCours : [],
        isAdmin : false,
    }) ;

    try {
        await createdUser.save() ;
    } catch(err) {
        console.log(err) ;
        return next(new HttpError("Erreur survenue, veuillez réessayer plus tard", 500)) ;
    }

    res.status(201).json({createdUser : createdUser.toObject({getters : true})})

}

const getUserById = async (req, res, next) => {
    const userId = req.params.uid;
    try {
      const user = await User.findById(userId)
            .select('-password')
            .populate({
                path: 'locationsEnCours',
                populate: [
                    { path: 'car', select: 'fabricator model categorie year isAutomatic isElectric dailyRentalPrice doors seats image baggage rating hundredKmComsommation kmRange fuelType' }, // Peuple les détails des voitures dans chaque réservation
                    { path: 'pickUpAdress' }, 
                    { path: 'deliveryAdress' } 
                ]
            });
      if (!user) {
        return next(new HttpError("Aucun utilisateur trouvé"));
      }
      res.status(201).json({ user: user.toObject({ getters: true }) });
    } catch (err) {
      return next(
        new HttpError("Erreur survenue lors de la communication avec BD")
      );
    }
  };

const deleteUser = async (req, res, next) => {
    const userId = req.params.uid;

    // Securite : Seul le user connecté peut se supprimer lui même
    if(req.userData.userId !== userId) {
      return next(new HttpError("Erreur Survenue : L'utilisateur courant n'a pas ce droit de supression", 401)) ;
    } 

    let user;
    try {
      user = await User.findByIdAndDelete(userId);
    } catch (err) {
      console.log(err);
      return next(
        new HttpError(
          "Erreur lors de la communication avec la base de données",
          500
        )
      );
    }
  
    if (!user) {
      return next(new HttpError("Utilisateur non trouvé", 404));
    }
    res
      .status(201)
      .json({ message: "L'utilisateur a été supprimé avec succès !" });
  };

  const updateUser = async (req, res, next) => {
    const userId = req.params.uid;
    const updatesOnUser = req.body;

    // Securite : Seul le user connecté peut se modifier lui même
    if(req.userData.userId !== userId) {
      return next(new HttpError("Erreur Survenue : L'utilisateur courant n'a pas ce droit de supression", 401)) ;
    } 


    try {
      const updatedUser = await User.findByIdAndUpdate(userId, updatesOnUser, {
        new: true,
      });
      if (!updatedUser) {
        return next(new HttpError("Aucun utilisateur trouvé", 404));
      }
      res
        .status(201)
        .json({ updatedUser: updatedUser.toObject({ getters: true }) });
    } catch (err) {
      return next(
        new HttpError("Erreur lors de la communication avec la BD", 500)
      );
    }
  };  

  const login = async (req, res, next) => {
    const {email, password} = req.body ;
    let existingUser ;
    try {
      existingUser = await User.findOne({email : email}) ;
    } catch (err) {
      console.log(err) ;
      const error = new HttpError('Login echoué , Veuillez réessayez plus tard', 500) ;
      return next(error) ;
    }
  
    if(!existingUser || existingUser.password !== password) {
      const error = new HttpError('Identification echoué, vérifiez vos identifiants', 500) ;
      return next(error) ;
    } else {
      let token;
      try {
        token = jwt.sign(
          {userId : existingUser.id, email : existingUser.email, isAdmin : existingUser.isAdmin},
          'cleSuperSecrete!',
          {expiresIn: '1h'}
        ) ;
  
      } catch (err) {
        console.log(err) ;
        const error = new HttpError('Signing up failed, please try again later.', 500) ;
        return next(error) ;
      }
  
       res.status(201).json({
        userId : existingUser.id,
        email : existingUser.email,
        token : token,
        isAdmin : existingUser.isAdmin
       }) ;
    } ;
  };

  


exports.getUsers = getUsers ;
exports.signUpUser = signUpUser ;
exports.getUserById = getUserById ;
exports.deleteUser = deleteUser ;
exports.updateUser = updateUser ;
exports.login = login ;