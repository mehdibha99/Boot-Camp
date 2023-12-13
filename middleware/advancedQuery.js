const advancedQuery = (model, populate) => async (req, res, next) => {
  const reqQuery = { ...req.query };

  const removeFields = ["select", "sort", "limit", "page"];

  removeFields.forEach((param) => delete reqQuery[param]);

  let queryStr = JSON.stringify(reqQuery);

  queryStr = queryStr.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  query = model.find(JSON.parse(queryStr));

  if (populate) {
    query = query.populate(populate);
  }
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
  const total = await model.countDocuments();

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
  res.advancedQuery = {
    success: true,
    count: data.length,
    pagination,
    data,
  };
  next();
};

module.exports = advancedQuery;
