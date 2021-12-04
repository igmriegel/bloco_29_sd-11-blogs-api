const errorMiddleware = (err, _req, res, _next) => {
  const {
    typeOfError,
    message,
    httpCode,
    name,
   } = err;

  if (name === 'SequelizeUniqueConstraintError') {
    const { original: sqlMessage } = err;
    const userMessage = 'User already registered';

    console.log(`(ERROR-LOG) Sequelize error unique const: ${sqlMessage}`);
    return res.status(409).json({ message: userMessage });
  }

  if (typeOfError === 'Internal Validation Error') {
    console.log(`(ERROR-LOG) Validation rules error: ${message}`);
    return res.status(httpCode).json({ message });
  }

  console.log(`(ERROR-LOG) Internal server error: ${err}`);
  return res.status(500).json(err);
};

module.exports = errorMiddleware;
