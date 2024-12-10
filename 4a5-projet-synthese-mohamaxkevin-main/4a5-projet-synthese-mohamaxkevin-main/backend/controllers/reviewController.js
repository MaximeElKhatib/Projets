const Review = require("../models/Review") ;
const HttpError = require('../util/HttpError') ;
const User = require('../models/User') ;
const Car = require("../models/Car") ;

const createReview = async (req, res, next) => {

    const {carId, rating, comment , date, comfort, cleanliness, pickUpReturn, valueForMoney} = req.body ;
    // Verifier l'existence de la voiture nécessaire??
    const createdReview = new Review( {
       user : req.userData.userId,
       car : carId,
       rating ,
       comment, 
       date, 
       comfort,
       cleanliness,
       pickUpReturn, 
       valueForMoney
    }) ;
    try {
        await createdReview.save() ;
    } catch(err) {
        return next(new HttpError("Erreur survenue, veuillez réessayer plus tard", 500)) ;
    }


    // Ajouter cette review dans les review du user
    try {
        const user = await User.findById(createdReview.user) ;
        user.reviews.push(createdReview) ;
        await user.save() ;
    } catch(err) {
        console.log(err)
        return next(new HttpError("Erreur survenue, veuillez réessayer plus tard", 500)) ;
    }

    // Ajouter cette review dans les review de la car
    try {
      const car = await Car.findById(carId) ;
      car.reviews.push(createdReview) ;
      await car.save() ;
  } catch(err) {
      console.log(err)
      return next(new HttpError("Erreur survenue, veuillez réessayer plus tard", 500)) ;
  }

    res.status(201).json({createdReview : createdReview.toObject({getters : true})})


}

const getReviews = async (req, res,next) => {

    try {
        const reviews = await Review.find() ;
        if(reviews.length === 0) {
            return next(new HttpError("Aucune reviews", 404)) ;
        }
        res.status(200).json({reviews : reviews.map((rev) => {
            return rev.toObject({getters : true}) ;
        })}) ;

    } catch(err) {
        console.log(err) ;
        return next(new HttpError("Erreur survenue, veuillez réessayer plus tard", 500)) ;
    }
}

const deleteReview = async (req, res, next) => {

    const reviewId = req.params.rid;
    try {

      // On recupere d'abord la review pour accéder au Car
      const review = await Review.findById(reviewId) ;
      if(!review) {
        return next(new HttpError("Erreur survenu",404)) ;
      }
      
      // Securite : Seul le user Connecté peut supprimer ses Reviews
      if(req.userData.userId !== review.user.toString()) {
        return next(new HttpError("Erreur Survenu : Vous n'avez pas les droits de supression sur cette Review")) ;
      }

      

      // Supression de la review chez la Car 
      const car = await Car.findById(review.car) ;
      if(!car) {
        return next(new HttpError("Erreur survenu",404)) ;
      }

      car.reviews = car.reviews.filter((rev) => {
        return rev.toString() !== reviewId ;
      }) ;

      await car.save() ;

      // Supression de la Review
      const reviewDelete = await Review.findByIdAndDelete(reviewId);
      if(!reviewDelete) {
        return next(new HttpError("Erreur survenu",404)) ;
      }

      // Supression de la review chez le user PS : On utilisera req.userId quand on aura le token
      const user = await User.findById(req.userData.userId) ;
        if(!user) {
            return next(new HttpError("Erreur survenu",404)) ;
        }

       user.reviews = user.reviews.filter((rev) => {
        return rev.toString() !== reviewId ;
      })

      await user.save() ;

    } catch (err) {
      console.log(err);
      return next(
        new HttpError(
          "Erreur lors de la communication avec la base de données",
          500
        )
      );
    }
      
    res
      .status(200)
      .json({ message: "La review a été supprimé avec succès !" });
}

const getReviewById = async (req, res, next) => {
    const revId = req.params.rid;
    try {
      const review = await Review.findById(revId);
      if (!review) {
        return next(new HttpError("Aucun utilisateur trouvé"));
      }
      res.status(201).json({review : review.toObject({getters : true})});
    } catch (err) {
      return next(
        new HttpError("Erreur survenue lors de la communication avec BD")
      );
    }
  };

  const updateReview = async (req, res ,next) => {

    const reviewId = req.params.rid ;
    const reviewUpdates = req.body ;

    try {

      const review = await Review.findById(reviewId) ;

      // Securite : Seul le user connecté peut modifier ses reviews
      if(req.userData.userId !== review.user.toString()) {
      return next(new HttpError("Erreur Survenue : L'utilisateur courant n'a pas ce droit de modification", 401)) ;
      } 

      const updatedReview = await Review.findByIdAndUpdate(reviewId, reviewUpdates ,{
        new: true,
      } ) ;
      if(!updatedReview) {
        return next(new HttpError("Erreur Survenue", 404));
      }

      res
        .status(201)
        .json({updatedReview : updatedReview.toObject({getters : true})});


    } catch(err) {
      return next(
        new HttpError("Erreur lors de la communication avec la BD", 500)
      );
    }


  }

exports.createReview = createReview ;
exports.getReviews= getReviews ;
exports.deleteReview = deleteReview ;
exports.getReviewById = getReviewById ;
exports.updateReview = updateReview ;
