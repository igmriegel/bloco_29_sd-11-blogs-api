const errorMiddleware = (err, _req, res, _next) => {
  const { typeOfError, message, httpCode } = err;

  if (typeOfError !== 'Internal Validation Error') {
    console.log(`Server internal error: ${err}`);

    return res.status(500).json(message);
  }

  console.log(`Error in validation rules: ${message}`);

  return res.status(httpCode).json(message);
};

module.exports = errorMiddleware;
