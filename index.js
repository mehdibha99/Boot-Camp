const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config({ path: "./config/config.env" });
const bootCamps = require("./routes/bootCamps");
const courses = require("./routes/courses");
const connectDB = require("./config/db");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const fileUpload = require("express-fileupload");

//connection to data base
connectDB();

const app = express();

app.use(express.json());

//middleware
app.use(logger);

//file upload
app.use(fileUpload());

//make the directory static
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/bootCamps", bootCamps);
app.use("/api/v1/courses", courses);

app.use(errorHandler);

app.listen(3000, () => console.log(`listen on port ${3000}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`error : ${err.message}`);
  server.close(() => process.exit(1));
});
