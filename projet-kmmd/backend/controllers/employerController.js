const Employer = require("../models/Employer");
const { route } = require("../routes/candidateRoutes");
const HttpError = require("../util/HttpError");
const jwt = require("jsonwebtoken");
const getEmployers = async (req, res, next) => {
  try {
    const employers = await Employer.find({}, "-password");
    if (employers.length == 0) {
      return next(new HttpError("Aucun employeur.", 404));
    }
    res.status(200).json({
      employeurs: employers.map((employeur) => {
        return employeur.toObject({ getters: true });
      }),
    });
  } catch (err) {
    return next(
      new HttpError("Erreur survenue, veuillez réessayer plus tard", 500)
    );
  }
};

const getEmployerById = async (req, res, next) => {
  const employerId = req.params.eid;
  try {
    const employer = await Employer.findById(employerId).select("-password");

    if (!employer) {
      return next(new HttpError("Aucun utilisateur trouvé"));
    }
    res.status(201).json({ employeur: employer.toObject({ getters: true }) });
  } catch (err) {
    return next(
      new HttpError("Erreur survenue lors de la communication avec la BD")
    );
  }
};

const signUpEmployeur = async (req, res, next) => {
  const {
    companyName,
    industry,
    email,
    password,
    phoneNumber,
    website,
    companyLogo,
    companyDescription,
    location,
  } = req.body;
  let existe;
  try {
    existe = await Employer.findOne({ email: email });
    if (existe) {
      return next(new HttpError("Employeur existant", 422));
    }
  } catch (err) {
    return next(new HttpError("Erreur survenue, veuillez réessayer plus tard"));
  }
  const createEmployeur = new Employer({
    companyName,
    industry,
    email,
    password,
    phoneNumber,
    website,
    companyLogo,
    companyDescription,
    location,
    jobOffers: [],
  });

  try {
    await createEmployeur.save();
  } catch (err) {
    return next(
      new HttpError("Erreur survenue, veuillez réessayer plus tard", 500)
    );
  }

  res
    .status(201)
    .json({ createEmployeur: createEmployeur.toObject({ getters: true }) });
};

const loginEmployeur = async (req, res, next) => {
  const { email, password } = req.body;
  let existe;

  try {
    existe = await Employer.findOne({ email: email });
  } catch (err) {
    return next(
      new HttpError("La connexion n'a pas fonctionné, réessayez plus tard", 500)
    );
  }

  if (!existe || existe.password !== password) {
    return next(new HttpError("Courriel ou mot de passe invalide", 401));
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existe._id,
        email: existe.email,
        role: "employer",
      },
      "cleSuperSecrete!",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(new HttpError("Le login a échoué", 500));
  }

  res.status(200).json({
    userId: existe._id,
    email: existe.email,
    token: token,

    role: "employer",
  });
};

exports.getEmployers = getEmployers;
exports.getEmployerById = getEmployerById;
exports.signUpEmployeur = signUpEmployeur;
exports.loginEmployeur = loginEmployeur;
