exports.getBootCamps = (req, res, next) => {
  res.status(200).json({ success: true, data: "get all the bootCamps" });
};

exports.getBootCamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, data: `get  the bootCamp ${req.params.id}` });
};

exports.createBootCamp = (req, res, next) => {
  res.status(200).json({ success: true, data: `create the bootCamp ` });
};

exports.updateBootCamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, data: `update the bootCamp ${req.params.id}` });
};

exports.deleteBootCamp = (req, res, next) => {
  res
    .status(200)
    .json({ success: true, data: `delete the bootCamp ${req.params.id}` });
};
