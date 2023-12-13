const mongoose = require("mongoose");

const ReviewSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "please add the title"],
    trim: true,
    maxlength: 30,
  },
  text: {
    type: String,
    required: [true, "please add the text"],
  },
  rating: {
    type: Number,
    default: 0,
    min: [1, "the value must be above or equal to 1"],
    max: [10, "the max value must be 10"],
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "BootCamp",
    required: [true, "Please provide a boot camp."],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Please provide a user."],
  },
});

module.exports = mongoose.model("Review", ReviewSchema);
