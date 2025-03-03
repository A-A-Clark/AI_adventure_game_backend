const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

function generateToken(payload, expiresIn = '1h') {
  return jwt.sign(payload, jwtSecret, { expiresIn });
}

function verifyToken(token) {
  return jwt.verify(token, jwtSecret);
}

module.exports = {
  generateToken,
  verifyToken
};
