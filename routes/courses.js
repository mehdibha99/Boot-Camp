const express = require("express");
const routes = express.Router({ mergeParams: true });

const {
  getCourse,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controller/courses");

const { protect, authorize } = require("../middleware/auth");

const Course = require("../model/Course");
const advancedQuery = require("../middleware/advancedQuery");

routes
  .route("/")
  .get(
    advancedQuery(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  )
  .post(protect, authorize("admin", "publisher"), createCourse);
routes
  .route("/:id")
  .get(getCourse)
  .put(protect, authorize("admin", "publisher"), updateCourse)
  .delete(protect, authorize("admin", "publisher"), deleteCourse);
module.exports = routes;
