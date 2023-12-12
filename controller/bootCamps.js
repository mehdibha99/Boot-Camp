const BootCamp = require("../model/BootCamp");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middleware/async");
const GeoCoder = require("../utils/GeoCoder");
const path = require("path");

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

  res.status(200).json(res.advancedQuery);
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
  const publishedBootCamp = await BootCamp.findOne({ user: req.user.id });

  if (publishedBootCamp && req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `the user with id ${req.user.id} already publish a bootcamp`,
        400
      )
    );
  }
  req.body.user = req.user.id;

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
  let bootCamp = await BootCamp.findById(req.params.id);
  if (!bootCamp) {
    return next(
      new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404)
    );
  }

  if (bootCamp.user.toString() !== req.user.id && req.user.role != "admin") {
    return next(
      new ErrorResponse(`user is  not authorize  ${req.params.id}`, 401)
    );
  }
  const data = await BootCamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(201).json({ success: true, data });
});

//delete a single BootCamp
exports.deleteBootCamp = asyncHandler(async (req, res, next) => {
  const bootCamp = await BootCamp.findById(req.params.id);
  if (!bootCamp)
    return next(
      new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404)
    );

  if (bootCamp.user.toString() !== req.user.id && req.user.role != "admin") {
    return next(
      new ErrorResponse(`user is  not authorize  ${req.params.id}`, 401)
    );
  }

  await bootcamp.deleteOne();
  res.status(201).json({ success: true, data: {} });
});

//upload photo
exports.bootCampUploadPhoto = asyncHandler(async (req, res, next) => {
  const bootcamp = await BootCamp.findById(req.params.id);
  if (!bootcamp)
    return next(
      new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404)
    );

  if (!req.files) {
    return next(new ErrorResponse(`file not found `, 400));
  }

  if (bootcamp.user.toString() !== req.user.id && req.user.role != "admin") {
    return next(
      new ErrorResponse(`user is  not authorize  ${req.params.id}`, 401)
    );
  }
  file = req.files.file;

  //make sure the file is image
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`file not image `, 400));
  }

  //make sure the size of photo is good
  if (file.size > 1000000) {
    return next(new ErrorResponse(`file size is too big `, 400));
  }
  //rename the photo
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
  file.mv(`./public/uploads/${file.name}`, async (err) => {
    if (err) {
      console.log(err);
      return next(new ErrorResponse("something wrang", 500));
    }
  });

  await BootCamp.findByIdAndUpdate(req.params.id, {
    photo: file.name,
  });

  res.status(200).json({ success: true, data: file.name });
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
