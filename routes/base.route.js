const express = require("express");
const {
  baseRouteController,
  baseRouteNotFound,
  baseRouteError,
} = require("../controllers/base.controller");
const router = express.Router();

router.get("/", baseRouteController);

router.use(baseRouteNotFound);

router.use(baseRouteError);

module.exports = router;
