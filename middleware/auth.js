const jwt = require('jsonwebtoken');
require('dotenv').config();

const VerifyToken = (req, res, next) => {
  const token = req.body.token || req.query.token || req.headers['x-access-token'];
  if (!token) {
    return res
      .status(403)
      .json({
        "message" : "A token is required for auth"
      });
  }

  // jwt verify
  const privateKey  = process.env.TOKEN_KEY;
  jwt.verify(token, privateKey, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({
          "message": "Invalid token"
        });
    }
    next();
  });
};

module.exports = VerifyToken;