const Course = require("../model/Course");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const BootCamp = require("../model/BootCamp");

//get all the courses

exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find().populate({
      path: "bootcamp",
      select: "name description",
    });
  }

  const data = await query;

  res.status(200).json({ success: true, count: data.length, data });
});

//get single Course

exports.getCourse = asyncHandler(async (req, res, next) => {
  data = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });
  if (!data) {
    return next(
      new ErrorResponse(`there is no Course with id ${req.params.id}`)
    );
  }

  res.status(200).json({ success: true, data });
});

//update Course

exports.updateCourse = asyncHandler(async (req, res, next) => {
  const data = await Course.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true, //return the object after updated
  });
  if (!data) {
    return next(
      new ErrorResponse(`there is no Course with id ${req.params.id}`)
    );
  }

  res.status(200).json({ success: true, data });
});

//delete course

exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const data = await Course.findByIdAndDelete(req.params.id);
  res.status(200).json({ success: true, data });
});

//create a course
//bootcamp/:bootcampId/course
exports.createCourse = asyncHandler(async (req, res, next) => {
  data = await BootCamp.findById(req.params.bootcampId);
  if (!data) {
    return next(
      new ErrorResponse(
        `BootCamp not found with id of ${req.params.bootcampId}`,
        404
      )
    );
  }
  req.body.bootcamp = req.params.bootcampId;
  console.log(req.body);
  course = await Course.create(req.body);
  res.status(201).json({ success: true, data: course });
});
