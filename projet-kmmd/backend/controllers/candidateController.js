const Candidate = require("../models/Candidate");
const HttpError = require("../util/HttpError");
const jwt = require("jsonwebtoken");

const test = (req, res, next) => {
  res.json({ message: "Message de TEST" });
};

const getCandidates = async (req, res, next) => {
  try {
    const candidates = await Candidate.find({}, "-password");

    if (candidates.length === 0) {
      return next(new HttpError("Aucun candidats trouvé", 404));
    }

    res.status(200).json({
      candidates: candidates.map((c) => {
        return c.toObject({ getters: true });
      }),
    });
  } catch (err) {
    return next(
      new HttpError("Erreur Survenue, veuillez réessayer plus tard ")
    );
  }
};

const getCandidateById = async (req, res, next) => {
  const candidateId = req.params.cid;
  try {
    const candidate = await Candidate.findById(candidateId);
    if (!candidate) {
      return next(new HttpError("Utilisateur non trouvé", 404));
    }

    res.status(200).json({ candidate: candidate.toObject({ getters: true }) });
  } catch (err) {
    return next(
      new HttpError("Erreur survenue , veuillez réessayer plus tard ")
    );
  }
};

const loginCandidate = async (req, res, next) => {
  const { email, password } = req.body;
  let existingCandidate;

  try {
    existingCandidate = await Candidate.findOne({ email: email });
  } catch (err) {
    return next(new HttpError("Login échoué, veuillez réessayer plus tard."));
  }

  if (!existingCandidate || existingCandidate.password !== password) {
    return next(
      new HttpError("Identification échouée. Vérifiez vos identifiants.", 401)
    );
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: existingCandidate._id, // Changed to userId
        email: existingCandidate.email,
        role: "candidat",
      },
      "cleSuperSecrete!",
      { expiresIn: "1h" }
    );
  } catch (err) {
    return next(new HttpError("Erreur lors de la création du token.", 500));
  }

  res.status(200).json({
    userId: existingCandidate._id, // Changed to userId
    email: existingCandidate.email,
    token: token,
    role: "candidat",
  });
};

const signUpCandidate = async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    location,
    profilePicture,
  } = req.body;
  let hasUser;
  try {
    hasUser = await Candidate.findOne({ email: email });
    if (hasUser) {
      return next(new HttpError("Utilisateur existant", 422));
    }
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Erreur survenue , veuillez réessayer plus tard", 500)
    );
  }

  const createdCandidate = new Candidate({
    firstName,
    lastName,
    email,
    password,
    phoneNumber,
    location,
    profilePicture,
    jobApplications: [],
  });

  try {
    await createdCandidate.save();

    res.status(201).json({ createdCandidate: createdCandidate });
  } catch (err) {
    console.log(err);
    return next(
      new HttpError("Erreur survenue, Veuillez réessayer plus tard"),
      500
    );
  }
};

exports.getCandidateById = getCandidateById;
exports.getCandidates = getCandidates;
exports.loginCandidate = loginCandidate;
exports.signUpCandidate = signUpCandidate;
