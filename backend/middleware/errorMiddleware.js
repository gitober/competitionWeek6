const errorHandler = (err, req, res, next) => {
  // Determine the status code: if the response already has a status code set (which means an error was thrown intentionally), use it; otherwise, use 500.
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // Send a JSON response with the error message, stack trace (in development), and the status code
  res.json({
      message: err.message,
      stack: process.env.NODE_ENV === 'production' ? null : err.stack,
      statusCode,
  });
};

module.exports = {
  errorHandler,
};

