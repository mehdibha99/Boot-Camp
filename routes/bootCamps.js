const express = require("express");
const routes = express.Router();

const {
  getBootCamps,
  getBootCamp,
  createBootCamp,
  updateBootCamp,
  deleteBootCamp,
  getBootCampsInRadius,
} = require("../controller/bootCamps");

const coursesRouter = require("./courses");

routes.use("/:bootcampId/courses", coursesRouter);

routes.route("/").get(getBootCamps).post(createBootCamp);

routes
  .route("/:id")
  .get(getBootCamp)
  .put(updateBootCamp)
  .delete(deleteBootCamp);

routes.route("/radius/:zipCode/:distance").get(getBootCampsInRadius);

module.exports = routes;
