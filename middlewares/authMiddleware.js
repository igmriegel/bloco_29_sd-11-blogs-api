require('dotenv').config();
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'blogsapi';

const authMiddleware = (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    if (!authToken) {
      return res.status(401).json({ message: 'Token not found' });
    }

    const { data: { email, displayName } } = jwt.verify(authToken, secret);
  
    req.authInfo = {
      email,
      displayName,
      authorized: true,
    };
  
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = authMiddleware;