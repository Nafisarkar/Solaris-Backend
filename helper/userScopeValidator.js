const userModel = require("../models/user.model");
const { verifyUserToken } = require("./webtoken");
const userScopeValidator = async (req, res, next) => {
  try {
    const cookie = req.cookies["cookie"];

    if (!cookie) {
      return res.status(401).json({
        from: "userScopeValidator",
        success: false,
        message: "Unauthorized: No cookie found",
      });
    }
    console.log(cookie);
    // check if the user is loged in or not
    try {
      const verificationResult = verifyUserToken(cookie);
      const user = await userModel.findOne({ email: verificationResult.email });
      // if the user is an loged in, pass the request to the next middleware
      if (!user) {
        return res.status(401).json({
          from: "userScopeValidator",
          success: false,
          message: "Unauthorized: User not loged in",
        });
      }
      next();
    } catch (error) {
      return res.status(401).json({
        from: "userScopeValidator",
        success: false,
        message: "Unauthorized: Invalid token",
      });
    }
  } catch (error) {
    res.status(500).json({
      from: "userScopeValidator",
      success: false,
      message: "error in userScopeValidator",
    });
  }
};

module.exports = userScopeValidator;
