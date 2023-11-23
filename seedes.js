const mongoose = require("mongoose");
const fs = require("fs");
const BootCamp = require("./model/BootCamp");

mongoose.connect("mongodb://127.0.0.1:27017/devCamper");

const bootCamps = JSON.parse(
  fs.readFileSync(`${__dirname}/data/bootcamps.json`, "utf-8")
);

const loadInDataBase = async () => {
  try {
    await BootCamp.create(bootCamps);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

const deleteData = async () => {
  try {
    await BootCamp.deleteMany();
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
