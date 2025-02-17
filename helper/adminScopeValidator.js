const userModel = require("../models/user.model");
const { verifyUserToken } = require("./webtoken");
const adminScopeValidator = async (req, res, next) => {
  try {
    const cookie = req.cookies["cookie"];
    if (!cookie) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No cookie found",
      });
    }
    // check if the user is an admin
    try {
      const verificationResult = verifyUserToken(cookie);
      const user = await userModel.findOne({ email: verificationResult.email });
      if (!user || !user.admin) {
        return res.status(403).json({
          success: false,
          message: "Forbidden: User is not an admin",
        });
      }
      // if the user is an admin, pass the request to the next middleware
      next();
    } catch (error) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "error in adminScopeValidator",
    });
  }
};

module.exports = adminScopeValidator;
