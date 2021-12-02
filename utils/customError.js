const customError = (msg = null, httpCode = null) => {
  const erroDeValidacao = new Error('Validation error');

  erroDeValidacao.typeOfError = 'Validation error';
  erroDeValidacao.message = msg;
  erroDeValidacao.httpCode = httpCode;

  return erroDeValidacao;
};

module.exports = customError;