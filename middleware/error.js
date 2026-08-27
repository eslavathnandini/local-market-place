const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  console.error(err.stack);

  if (err.name === 'CastError') error.message = 'Resource not found';
  if (err.code === 11000) error.message = 'Duplicate field value';
  if (err.name === 'ValidationError') {
    error.message = Object.values(err.errors).map(val => val.message);
  }

  res.status(err.statusCode || 500).json({ success: false, message: error.message });
};

module.exports = errorHandler;
