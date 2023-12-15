const asyncHandler = require("../middleware/async");
const ErrorResponse = require("../utils/ErrorResponse");
const Review = require("../model/Review");
const BootCamp = require("../model/BootCamp");

//get all the courses
//or get all courses in the BootCamp
exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const review = await Review.find({ bootcamp: req.params.bootcampId });
    return res
      .status(200)
      .json({ success: true, count: review.length, data: review });
  } else {
    res.status(200).json(res.advancedQuery);
  }
});

//get a single review
exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id)
    .populate({
      path: "bootcamp",
      select: "name description",
    })
    .populate({ path: "user", select: "name" });
  if (!review) {
    return nex(new ErrorResponse("the is no review with these id", 404));
  }
  return res.status(200).json({ success: true, data: review });
});

//create a review
exports.createReview = asyncHandler(async (req, res, next) => {
  const bootCamp = await BootCamp.findById(req.params.bootcampId);

  if (!bootCamp) {
    return next(new ErrorResponse("the is no bootCamp with these id", 404));
  }
  req.body.user = req.user.id;
  req.body.bootcamp = bootCamp.id;
  const review = await Review.create(req.body);
  return res.status(200).json({ success: true, data: review });
});
