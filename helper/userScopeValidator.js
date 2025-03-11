const userModel = require("../models/user.model");
const { verifyUserToken } = require("./webtoken");

const userScopeValidator = async (req, res, next) => {
  try {
    // Check for token in multiple places
    const token =
      req.cookies?.cookie ||
      req.headers.authorization?.replace("Bearer ", "") ||
      req.query.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: No token found",
      });
    }

    // Check if the user is logged in
    try {
      const verificationResult = verifyUserToken(token);
      const user = await userModel.findOne({ email: verificationResult.email });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized: User not found",
        });
      }

      // Add the user to the request for later use
      req.user = user;
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
      message: "Server error in authentication",
    });
  }
};

module.exports = userScopeValidator;
