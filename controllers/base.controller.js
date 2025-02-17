const createError = require("http-errors");

const baseRouteController = (req, res, next) => {
  res.status(200).json({
    message: "Welcome to the API test",
  });
};

const baseRouteNotFound = (req, res, next) => {
  next(createError.NotFound());
};

const baseRouteError = (err, req, res, next) => {
  res.status(err.status || 500).json({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
};

module.exports = { baseRouteController, baseRouteNotFound, baseRouteError };
