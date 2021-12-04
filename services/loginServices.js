const { User } = require('../models');
const { validateEmail, validatePassword } = require('./userServices');
const customEror = require('../utils/customError');
const generateTokenJWT = require('../utils/generateTokenJWT');

const validateLogin = async (loginData) => {
  const { email, password } = loginData;
  const userData = await User.findAll({ where: { email } });

  if (userData.length !== 0) {
    const [{ dataValues }] = userData;

    if (String(dataValues.password) !== String(password)) throw customEror('Invalid fields', 400);
  } else {
    throw customEror('Invalid fields', 400);
  }

  return userData;
};

const logUserIn = async (loginData) => {
  const { email, password } = loginData;
  const validEmail = validateEmail(email);
  const validPass = validatePassword(password);
  const validLogin = await validateLogin({ email, password });

  if (validEmail && validPass && validLogin) {
    const { displayName } = validLogin;
    const newToken = generateTokenJWT({ displayName, email });

    return newToken;
  }
};

module.exports = {
  logUserIn,
};
