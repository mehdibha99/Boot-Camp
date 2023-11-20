const express = require("express");
const dotenv = require("dotenv").config({ path: "./config/config.env" });
const bootCamps = require("./routes/bootCamps");
const app = express();
const logger = require("./midelware/logger");
app.use(logger);

app.use("/api/v1/bootCamps", bootCamps);

app.listen(3000, () => console.log(`listen on port ${3000}`));
