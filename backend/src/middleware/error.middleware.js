const errorMiddleware = (err, req, res, next) => {
  console.error(err);

  const statusCode = err.statusCode || (err.code === 11000 ? 409 : 500);
  const message =
    err.code === 11000
      ? "A record with the provided unique value already exists"
      : err.name === "ValidationError"
        ? err.message
        : err.message || "Internal server error";

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports = errorMiddleware;