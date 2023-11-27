const mongoose = require("mongoose");
const fs = require("fs");
const BootCamp = require("./model/BootCamp");
const Course = require("./model/Course");

mongoose.connect("mongodb://127.0.0.1:27017/devCamper");

const bootCamps = JSON.parse(
  fs.readFileSync(`${__dirname}/data/bootcamps.json`, "utf-8")
);

const courses = JSON.parse(
  fs.readFileSync(`${__dirname}/data/courses.json`, "utf-8")
);

const loadInDataBase = async () => {
  try {
    await BootCamp.create(bootCamps);
    await Course.create(courses);

    process.exit();
  } catch (err) {
    console.error(err);
  }
};

const deleteData = async () => {
  try {
    await BootCamp.deleteMany();
    await Course.deleteMany();

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
