const { mongoose } = require("mongoose");
const BootCamp = require("../model/BootCamp");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const GeoCoder = require("../utils/GeoCoder");

//get all the BootCamp
exports.getBootCamps = asyncHandler(async (req, res, next) => {
  const reqQuery = { ...req.query };

  const removeFields = ["select", "sort", "limit", "page"];

  removeFields.forEach((param) => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = BootCamp.find(JSON.parse(queryStr)).populate("courses");

  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }

  if (req.query.sort) {
    const sortBy = req.query.sort.split(",").join(" ");
    query = query.sort(sortBy);
  } else {
    query = query.sort("-createdAt");
  }

  const limit = parseInt(req.query.limit, 10) || 10;
  const page = parseInt(req.query.page, 10) || 1;
  const skip = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await BootCamp.countDocuments();

  query = query.skip(skip).limit(limit);

  const data = await query;

  pagination = {};

  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }
  if (skip > 0) {
    pagination.previous = {
      page: page - 1,
      limit,
    };
  }

  res.status(200).json({ success: true, pagination, data });
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
  const bootcamp = await BootCamp.findById(req.params.id);
  console.log(bootcamp);
  if (!bootcamp)
    return next(
      new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404)
    );
  await bootcamp.deleteOne();
  res.status(201).json({ success: true, data: {} });
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
