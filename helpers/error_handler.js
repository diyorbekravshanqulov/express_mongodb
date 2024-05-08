const errorHandler = (res, error) => {
  res.status(404).send({ message: `Xatlik ${error}` });
};

module.exports = errorHandler;
