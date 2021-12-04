const { User } = require('../models');
const customEror = require('../utils/customError');
const generateTokenJWT = require('../utils/generateTokenJWT');

const validateUserName = (name) => {
  if (name.length < 8) {
    throw customEror('"displayName" length must be at least 8 characters long', 400);
  }

  return true;
};

const validatePassword = (password) => {
  if (password === '') throw customEror('"password" is not allowed to be empty', 400);
  if (!password) throw customEror('"password" is required', 400);
  if (password.length < 6) throw customEror('"password" length must be 6 characters long', 400);

  return true;
};

const validateEmail = (email) => {
  const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;

  if (email === '') throw customEror('"email" is not allowed to be empty', 400);
  if (!email) throw customEror('"email" is required', 400);
  if (!regex.test(email)) throw customEror('"email" must be a valid email', 400);

  return true;
};

const createUser = async (userData) => {
  const { displayName, email, password, image } = userData;
  const validName = validateUserName(displayName);
  const validEmail = validateEmail(email);
  const validPass = validatePassword(password);

  if (validEmail && validName && validPass) {
    await User.create({ displayName, email, password, image });
    const newToken = generateTokenJWT({ displayName, email });

    return newToken;
  }
};

module.exports = {
  createUser,
  validateEmail,
  validatePassword,
};
