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

  return [true, userData];
};

const logUserIn = async (loginData) => {
  const validEmail = validateEmail(loginData.email);
  const validPass = validatePassword(loginData.password);
  const [validLogin, userData] = await validateLogin(loginData);

  if (validEmail && validPass && validLogin) {
    const [{ dataValues: { id, displayName, email } }] = userData;
    console.log({ id, displayName, email });
    const newToken = generateTokenJWT({ id, displayName, email });

    return newToken;
  }
};

module.exports = {
  logUserIn,
};
