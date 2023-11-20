const express = require("express");
const routes = express.Router();

const {
  getBootCamps,
  getBootCamp,
  createBootCamp,
  updateBootCamp,
  deleteBootCamp,
} = require("../controller/bootCamps");

routes.route("/").get(getBootCamps).post(createBootCamp);

routes
  .route("/:id")
  .get(getBootCamp)
  .put(updateBootCamp)
  .delete(deleteBootCamp);

module.exports = routes;
