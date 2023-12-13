const mongoose = require("mongoose");
const fs = require("fs");
const BootCamp = require("./model/BootCamp");
const Course = require("./model/Course");
const User = require("./model/User");
const Review = require("./model/Review");

mongoose.connect("mongodb://127.0.0.1:27017/devCamper");

const bootCamps = JSON.parse(
  fs.readFileSync(`${__dirname}/data/bootcamps.json`, "utf-8")
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/data/courses.json`, "utf-8")
);

const users = JSON.parse(
  fs.readFileSync(`${__dirname}/data/users.json`, "utf-8")
);

const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/data/reviews.json`, "utf-8")
);
const loadInDataBase = async () => {
  try {
    await BootCamp.create(bootCamps);
    await Course.create(courses);
    await User.create(users);
    await Review.create(reviews);

    process.exit();
  } catch (err) {
    console.error(err.message);
  }
};

const deleteData = async () => {
  try {
    await BootCamp.deleteMany();
    await Course.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === "-d") {
  deleteData();
} else if (process.argv[2] === "-i") {
  loadInDataBase();
}
