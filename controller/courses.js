const Course = require("../model/Course");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const BootCamp = require("../model/BootCamp");

//get all the courses

exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    courses = Course.find({ bootcamp: req.params.bootcampId });
    return res
      .status(200)
      .json({ success: true, count: courses.count(), data: courses });
  } else {
    res.status(200).json(res.advancedQuery);
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
  let course = await Course.findById(req.params.id);
  if (!course) {
    return next(
      new ErrorResponse(`there is no Course with id ${req.params.id}`)
    );
  }
  if (course.user.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `user with id ${req.user.id} is not authorized to update this course`
      )
    );
  }
  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true, //return the object after updated
  });

  res.status(200).json({ success: true, data: course });
});

//delete course

exports.deleteCourse = asyncHandler(async (req, res, next) => {
  const data = await Course.findById(req.params.id);
  if (!data) {
    return next(
      new ErrorResponse(`there is no course with id ${req.params.id} `, 401)
    );
  }
  if (data.user.toString() !== req.user.id && req.user.role != "admin") {
    return next(
      new ErrorResponse(
        `user with id ${req.user.id} is not authorized to delete this course`
      )
    );
  }
  await data.deleteOne();
  res.status(200).json({ success: true, data: {} });
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
  console.log(data);
  if (data.user.toString() !== req.user.id && req.user.role != "admin") {
    return next(
      new ErrorResponse(
        `user with id ${req.user.id} is not authorized to create this course`
      )
    );
  }
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;
  course = await Course.create(req.body);
  res.status(201).json({ success: true, data: course });
});
