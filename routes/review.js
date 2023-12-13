const express = require("express");
const routes = express.Router({ mergeParams: true });
const advancedResults = require("../middleware/advancedQuery");
const { protect, authorize } = require("../middleware/auth");
const Review = require("../model/Review");
const { getReviews } = require("../controller/review");

routes.route("/").get(advancedResults(Review), getReviews);

module.exports = routes;
