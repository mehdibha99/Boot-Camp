const { mongoose } = require("mongoose");
const Course = require("../model/Course");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");

//get all the courses

exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find();
  }

  const data = await query;

  res.status(200).json({ success: true, count: data.length, data });
});
