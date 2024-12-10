const jwt = require('jsonwebtoken');
const HttpError = require('../util/HttpError');

module.exports = (req, res, next) => {
  try {
    if (req.method === 'OPTIONS') {
      return next();
    }
    const token = req.headers.authorization.split(' ')[1]; 
    if (!token) {
      throw new Error('Authentication failed!');
    }

    const decodedToken = jwt.verify(token, 'cleSuperSecrete!');

    if(decodedToken.isAdmin !== 'admin') {
        throw new Error('Seul l\'administrateur est autorisé à performer cet action !')
    }

    req.userData = { userId: decodedToken.userId, email : decodedToken.email };
    next();
  } catch (err) {
    const error = new HttpError('Authentication failed!', 403);
    return next(error);
  }
};
