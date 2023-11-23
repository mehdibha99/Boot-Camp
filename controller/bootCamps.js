const { mongoose } = require("mongoose");
const BootCamp = require("../model/BootCamp");
const ErrorResponse = require("../utils/ErrorResponse");

//get all the BootCamp
exports.getBootCamps = async (req, res, next) => {
  try {
    const data = await BootCamp.find();
    if (!data) {
      return next(
        new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

// get a single BootCamp
exports.getBootCamp = async (req, res, next) => {
  try {
    const data = await BootCamp.findById(req.params.id);
    if (!data) {
      return next(
        new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

//create BootCamp
exports.createBootCamp = async (req, res, next) => {
  try {
    const data = await BootCamp.create(req.body);
    if (!data) {
      return next(
        new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

//update a single BootCamp
exports.updateBootCamp = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

//delete a single BootCamp
exports.deleteBootCamp = async (req, res, next) => {
  try {
    const data = await BootCamp.findByIdAndDelete(req.params.id);
    if (!data)
      return next(
        new ErrorResponse(`BootCamp not found with id of ${req.params.id}`, 404)
      );
    res.status(201).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};
