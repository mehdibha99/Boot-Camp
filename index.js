const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config({ path: "./config/config.env" });
const bootCamps = require("./routes/bootCamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const connectDB = require("./config/db");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

//connection to data base
connectDB();

const app = express();

app.use(express.json());

//cookie parser
app.use(cookieParser());

//middleware
app.use(logger);

//file upload
app.use(fileUpload());

//make the directory static
app.use(express.static(path.join(__dirname, "public")));

//router
app.use("/api/v1/bootCamps", bootCamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);

//middleware for error
app.use(errorHandler);

app.listen(3000, () => console.log(`listen on port ${3000}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`error : ${err.message}`);
  server.close(() => process.exit(1));
});
