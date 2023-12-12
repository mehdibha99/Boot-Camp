const asyncHandler = require("../middleware/async");
const { findById, findByIdAndRemove } = require("../model/User");
const User = require("../model/User");
const ErrorResponse = require("../utils/ErrorResponse");

//get all the users
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedQuery);
});
//get single user
exports.getUser = asyncHandler(async (req, res, next) => {
  const data = await User.findById(req.params.id);
  if (!data) {
    return next(
      new ErrorResponse(`No user found with id ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data });
});
//update User
exports.updateUser = asyncHandler(async (req, res, next) => {
  let data = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  //if no data is returned then there was a problem
  if (!data) {
    return next(new ErrorResponse("Cannot update user", 404));
  }
  res
    .status(201)
    .json({ success: true, message: "User updated successfully!", data: data });
});
//delete user
exports.deleteUser = asyncHandler(async (req, res, next) => {
  const data = await findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, data: {} });
});
//create user
exports.createUser = asyncHandler(async (req, res, next) => {
  const data = await create(req.body);
  res.status(200).json({ success: true, data });
});
