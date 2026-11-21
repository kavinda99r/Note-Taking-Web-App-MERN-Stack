module.exports = (error, req, res, next) => {
  if (res.headersSent) return next(error);
  const status = error.status || 500;
  res.status(status).json({
    error: true,
    message: error.type === "entity.parse.failed"
      ? "Invalid JSON body"
      : status < 500 ? error.message : "Internal server error",
  });
};
