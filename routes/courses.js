const express = require("express");
const routes = express.Router({ mergeParams: true });

const {
  getCourse,
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
} = require("../controller/courses");

routes.route("/").get(getCourses).post(createCourse);
routes.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);
module.exports = routes;
