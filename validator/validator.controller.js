const { validationResult } = require("express-validator");

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const errorMessages = errors.array().map((error) => error.msg);
  res.status(422).json({ errors: errorMessages });
};

module.exports = { validator };
