const jwt = require("jsonwebtoken");
const createHttpError = require("http-errors");
require("dotenv").config();
const KEY = process.env.JWT_KEY;

const tokenCreate = (payload, expireTime) => {
  try {
    return jwt.sign(payload, KEY, { expiresIn: expireTime });
  } catch (error) {
    throw createHttpError.InternalServerError(error.message);
  }
};

const verifyUserToken = (token) => {
  try {
    return jwt.verify(token, KEY);
  } catch (error) {
    throw createHttpError.Unauthorized(error.message);
  }
};

module.exports = { tokenCreate, verifyUserToken };
