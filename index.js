const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config({ path: "./config/config.env" });
const bootCamps = require("./routes/bootCamps");
const courses = require("./routes/courses");
const auth = require("./routes/auth");
const admin = require("./routes/admin");
const review = require("./routes/review");
const connectDB = require("./config/db");
const logger = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");

//security
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");

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

//sanitize
app.use(mongoSanitize());

//protection headers
app.use(helmet());

//prevent xss attack
app.use(xss());

//limit the request
const limiting = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiting);

//prevent http params pollution
app.use(hpp());

//enable request from other origin
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credential: true,
  })
);

//make the directory static
app.use(express.static(path.join(__dirname, "public")));

//router
app.use("/api/v1/bootCamps", bootCamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/auth/users", admin);
app.use("/api/v1/reviews", review);

//middleware for error
app.use(errorHandler);

app.listen(3000, () => console.log(`listen on port ${3000}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`error : ${err.message}`);
  server.close(() => process.exit(1));
});
