const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY;

module.exports = function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.slice(7);

  if(!token) {
    return res.status(400).json('Missing access token');
  }

  jwt.verify(token, secretKey, (err, user) => {
    if(err) {
      return res.status(401).json('Access token expired');
    }

    req.user = user;

    next();
  });
};