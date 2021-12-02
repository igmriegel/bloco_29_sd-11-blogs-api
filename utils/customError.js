const customError = (msg = null, httpCode = null) => {
  const erroDeValidacao = new Error('Internal Validation Error');

  erroDeValidacao.typeOfError = 'Internal Validation Error';
  erroDeValidacao.message = msg;
  erroDeValidacao.httpCode = httpCode;

  return erroDeValidacao;
};

module.exports = customError;