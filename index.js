const express = require("express");
const dotenv = require("dotenv").config({ path: "./config/config.env" });
const bootCamps = require("./routes/bootCamps");
const connectDB = require("./config/db");
const logger = require("./middleware/logger");

//connection to data base
connectDB();

const app = express();

app.use(express.json());

//middleware
app.use(logger);

app.use("/api/v1/bootCamps", bootCamps);

app.listen(3000, () => console.log(`listen on port ${3000}`));

process.on("unhandledRejection", (err, promise) => {
  console.log(`error : ${err.message}`);
  server.close(() => process.exit(1));
});
