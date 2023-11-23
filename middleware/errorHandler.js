const ErrorResponse = require("../utils/ErrorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  console.log(err.stack);

  //bad id
  if (err.name === "CastError") {
    error = new ErrorResponse(`Resource not found with id ${err.value}`, 404);
  }

  //mongoose duplicate value
  if (err.code === 11000) {
    error = new ErrorResponse("Duplicate field entered", 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message });
};

module.exports = errorHandler;
