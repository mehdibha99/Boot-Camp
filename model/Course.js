const mongoose = require("mongoose");

const CourseSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add the title of course"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please add the description"],
  },
  weeks: {
    type: Number,
    require: [true, "please add the number of weeks"],
  },
  tuition: {
    type: Number,
    require: [true, "please add a tuition "],
  },
  minimumSkill: {
    type: String,
    require: [true, "please add the minimal skills"],
    enum: ["beginner", "intermediate", "advanced"],
  },
  scholarships: {
    type: Boolean,
    default: false,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "BootCamp",
    require: true,
  },
});

module.exports = mongoose.model("Course", CourseSchema);
