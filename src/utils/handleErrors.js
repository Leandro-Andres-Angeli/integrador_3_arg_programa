const handleError = (err) => {
  const {
    original: { errno, sqlState, sqlMessage },
  } = err;
  return { errno, sqlState, sqlMessage };
};
const handleNoResult = () => {
  return { resultados: 'no se encontraron resultados' };
};
const validateNum = (param) => /\d/.test(param);
const resNoResult = (res) => res.status(404).send(handleNoResult());
module.exports = { handleError, resNoResult, validateNum };
