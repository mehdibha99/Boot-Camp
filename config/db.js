const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect("mongodb://127.0.0.1:27017/devCamper");
    console.log(conn.connection.host);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = connectDB;
