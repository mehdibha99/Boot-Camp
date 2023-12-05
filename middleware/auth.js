const jwt = require("jsonwebtoken");
const errorHandler = require("./errorHandler");
const asyncHandler = require("./async");
const User = require("../model/User");

module.exports = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
});
