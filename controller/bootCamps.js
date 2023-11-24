const { mongoose } = require("mongoose");
const BootCamp = require("../model/BootCamp");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const GeoCoder = require("../utils/GeoCoder");

//get all the BootCamp
exports.getBootCamps = asyncHandler(async (req, res, next) => {
  const data = await BootCamp.find();
  if (!data) {
    return next(
      new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data });
});

// get a single BootCamp
exports.getBootCamp = asyncHandler(async (req, res, next) => {
  const data = await BootCamp.findById(req.params.id);
  if (!data) {
    return next(
      new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data });
});

//create BootCamp
exports.createBootCamp = asyncHandler(async (req, res, next) => {
  const data = await BootCamp.create(req.body);
  if (!data) {
    return next(
      new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(201).json({ success: true, data });
});

//update a single BootCamp
exports.updateBootCamp = asyncHandler(async (req, res, next) => {
  const data = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!data) {
    return next(
      new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(201).json({ success: true, data });
});

//delete a single BootCamp
exports.deleteBootCamp = asyncHandler(async (req, res, next) => {
  const data = await BootCamp.findByIdAndDelete(req.params.id);
  if (!data)
    return next(
      new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404)
    );
  res.status(201).json({ success: true, data });
});

//get BootCamps within radius
exports.getBootCampsInRadius = asyncHandler(async (req, res, next) => {
  const { zipCode, distance } = req.params;
  const loc = await GeoCoder.geocode(zipCode);

  const log = loc[0].longitude;
  const lat = loc[0].latitude;

  //calc radius dist/radius of earth
  //3963 mi or 6378km

  const radius = distance / 3963;

  const bootCamps = await BootCamp.find({
    location: {
      $geoWithin: { $centerSphere: [[log, lat], radius] },
    },
  });
  res
    .status(200)
    .json({ success: true, count: bootCamps.length, data: bootCamps });
});
