require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'blogsapi';

const generateJWT = (userData) => {
  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };
  const token = jwt.sign({ data: userData }, secret, jwtConfig);

  return token;
};

module.exports = generateJWT;
