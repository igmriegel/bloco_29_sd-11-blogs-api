const generateTimeStamp = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDay();
  const hora = date.getHours();
  const minutos = date.getMinutes();
  const segundos = date.getSeconds();

  return `${year}-${month}-${day}T${hora}:${minutos}:${segundos}`;
};

module.exports = generateTimeStamp;