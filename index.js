const express = require("express");
const dotenv = require({ path: "./config/config.env" });

const app = express();

app.get("/", (req, res) => {
  res.send(`<h1>Welcome to my API</h1>`);
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`listen on port ${PORT}`));
