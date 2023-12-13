const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/ErrorResponse");
const Review = require("../model/Review");
const BootCamp = require("../model/BootCamp");

//get all the courses
//or get all courses in the BootCamp
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    review = Review.find({ bootcamp: req.params.bootcampId });
    return res
      .status(200)
      .json({ success: true, count: review.length, data: review });
  } else {
    res.status(200).json(res.advancedQuery);
  }
});
