const express = require("express");
const routes = express.Router();

const {
  getBootCamps,
  getBootCamp,
  createBootCamp,
  updateBootCamp,
  deleteBootCamp,
  getBootCampsInRadius,
  bootCampUploadPhoto,
} = require("../controller/bootCamps");

const BootCamp = require("../model/BootCamp");
const advancedQuery = require("../middleware/advancedQuery");

const coursesRouter = require("./courses");

routes.use("/:bootcampId/courses", coursesRouter);

routes
  .route("/")
  .get(advancedQuery(BootCamp, "courses"), getBootCamps)
  .post(createBootCamp);

routes.route("/:id/photo").put(bootCampUploadPhoto);

routes
  .route("/:id")
  .get(getBootCamp)
  .put(updateBootCamp)
  .delete(deleteBootCamp);

routes.route("/radius/:zipCode/:distance").get(getBootCampsInRadius);

module.exports = routes;
