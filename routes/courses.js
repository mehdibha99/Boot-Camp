const express = require("express");
const routes = express.Router({ mergeParams: true });

const { getCourses } = require("../controller/courses");

routes.route("/").get(getCourses);

module.exports = routes;
