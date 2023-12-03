const express = require("express");
const routes = express.Router({ mergeParams: true });

const {
  getCourse,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controller/courses");

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
  .post(createCourse);
routes.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);
module.exports = routes;
