const jwt = require("jsonwebtoken");
const HttpError = require("../util/HttpError");

module.exports = (req, res, next) => {
  try {
    if (req.method === "OPTIONS") {
      return next();
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Authentication failed!");
    }

    const decodedToken = jwt.verify(token, "cleSuperSecrete!");
    req.candidateData = {
      candidateId: decodedToken.candidateId,
      email: decodedToken.email,
    };
    req.next();
  } catch (err) {
    const error = new HttpError("Authentication failed!", 401);
    return next(error);
  }
};
