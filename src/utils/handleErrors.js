const handleError = (err) => {
  const {
    original: { errno, sqlState, sqlMessage },
  } = err;
  return { errno, sqlState, sqlMessage };
};
const handleNoResult = () => {
  return { resultados: 'no se encontraron resultados' };
};

const validateNum = (param) => {
  return param.match(/\D/g) === null;
};
const validateStringAndSpaces = (param) => {
  return param.match(/^[a-zA-Z][a-zA-Z ]*$/) !== null;
};
const validateStringAndSpacesAndSpecialChars = (param) => {
  return param.match(/^[a-zA-Z][a-zA-Z\s-]*$/) !== null;
};
const validateString = (param) => {
  return param.match(/[^a-zA-Z]/g) === null;
};
const resNoResult = (res) => res.status(404).send(handleNoResult());
module.exports = {
  handleError,
  resNoResult,
  validateNum,
  validateString,
  validateStringAndSpaces,
  validateStringAndSpacesAndSpecialChars,
};
