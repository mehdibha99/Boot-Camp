const asyncHandler = require("../middleware/async");
const User = require("../model/User");
const ErrorResponse = require("../utils/ErrorResponse");

exports.register = asyncHandler((req, res, next) => {
  res.status(200).json({ success: true });
});
