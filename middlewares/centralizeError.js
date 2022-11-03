const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  // eslint-disable-next-line no-console
  console.log('here');
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'An error occurred in the server'
        : message
    });
  next();
};

module.exports = errorHandler;
