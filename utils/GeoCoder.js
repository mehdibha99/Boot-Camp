const NodeGeocoder = require("node-geocoder");

const options = {
  provider: "mapquest",
  httpAdapter: "https",
  apiKey: "s8wCa5fwmpY79aNxhVy9TpZaAlNljBph",
  formatter: null,
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
