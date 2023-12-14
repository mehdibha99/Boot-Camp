const express = require("express");
const routes = express.Router({ mergeParams: true });
const advancedResults = require("../middleware/advancedQuery");
const { protect, authorize } = require("../middleware/auth");
const Review = require("../model/Review");
const { getReviews, getReview, createReview } = require("../controller/review");

routes
  .route("/")
  .get(
    advancedResults(Review, { path: "bootcamp", select: "name description" }),
    getReviews
  )
  .post(protect, authorize("user", "admin"), createReview);
routes.route("/:id").get(getReview);

module.exports = routes;
