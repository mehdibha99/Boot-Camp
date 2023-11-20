const logger = (req, res, next) => {
  console.log(
    `${req.method} ${req.protocol}://${req.get("host")}${res.originalUrl} ${
      res.statusCode
    }`
  );
  next();
};

module.exports = logger;
