const express = require("express");
const routes = express.Router();
const { protect, authorize } = require("../middleware/auth");
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
  .post(protect, authorize("admin", "publisher"), createBootCamp);

routes
  .route("/:id/photo")
  .put(protect, authorize("admin", "publisher"), bootCampUploadPhoto);

routes
  .route("/:id")
  .get(getBootCamp)
  .put(protect, authorize("admin", "publisher"), updateBootCamp)
  .delete(protect, authorize("admin", "publisher"), deleteBootCamp);

routes.route("/radius/:zipCode/:distance").get(getBootCampsInRadius);

module.exports = routes;
