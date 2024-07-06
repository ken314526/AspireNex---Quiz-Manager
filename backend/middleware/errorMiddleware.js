const notFound = (req, res, next) => {
  const error = `Not Found - ${req.originalUrl}`;
  return res.status(404).json({
    message: error,
    error: true,
  });
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};

module.exports = { notFound, errorHandler };
