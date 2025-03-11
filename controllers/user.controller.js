const createError = require("http-errors");
const userMode = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const { tokenCreate, verifyUserToken } = require("../helper/webtoken");
const sendEmail = require("../helper/mailer");
const activationMail = require("../helper/activationMail");
require("dotenv").config();
const getAllUser = async (req, res, next) => {
  try {
    const users = await userMode.find(
      {},
      {
        // the perameter is the field that you want to exclude from the response
        password: 0,
        __v: 0,
      }
    );
    res.status(200).json({
      success: true,
      message: "get all users ✓",
      total: users.length,
      data: users,
    });
  } catch (error) {
    next(createError.InternalServerError());
  }
};

const signupUser = async (req, res, next) => {
  try {
    const user = new userMode({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      address: req.body.address,
      phone: req.body.phone,
      admin: req.body.admin,
      image: req.body.image,
    });
    const emailExist = await userMode.findOne({ email: user.email });
    if (emailExist) {
      return res.status(400).json({
        success: false,
        message: "Email already exists, just sign in",
      });
    }

    const token = tokenCreate(
      {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        address: req.body.address,
        phone: req.body.phone,
        admin: req.body.admin,
        image: req.body.image,
      },
      "5m"
    );

    const mailOptions = {
      from: process.env.SMTP_MAIL,
      to: req.body.email,
      subject: "Email Verification [ PosterSmith ]",
      html: activationMail(req.body.name, process.env.VARIFICATION_URL, token),
    };

    try {
      await sendEmail(mailOptions);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error,
      });
    }

    res.status(200).json({
      success: true,
      message: `Mail send to the ${user.email}`,
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const createUser = async (req, res, next) => {
  try {
    const userVarification = verifyUserToken(req.query.token);
    if (!userVarification) {
      return res.status(400).json({
        success: false,
        message: "Invalid token",
      });
    }

    const user = new userMode({
      name: userVarification.name,
      email: userVarification.email,
      password: userVarification.password,
      address: userVarification.address,
      phone: userVarification.phone,
      admin: userVarification.admin,
      image: userVarification.image,
    });
    const emailExist = await userMode.findOne({ email: user.email });
    if (emailExist) {
      throw next(createError.Conflict("Email already exists"));
    }

    await user.save();

    res.status(200).json({
      success: true,
      message: "User created successfully",
      data: userVarification,
      redirect: process.env.FRONTEND_URL,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User creation failed",
    });
  }
};

const loginUser = async (req, res, next) => {
  try {
    const user = await userMode.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcryptjs.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const cookieAuth = tokenCreate(
      {
        email: user.email,
        password: user.password,
      },
      "7d"
    );

    // Set cookie with SameSite=None for cross-site requests
    res
      .cookie("cookie", cookieAuth, {
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        path: "/",
      })
      .status(200)
      .json({
        success: true,
        message: "User login successfully",
        data: {
          email: user.email,
          name: user.name,
          address: user.address,
          phone: user.phone,
          admin: user.admin,
          image: user.image,
        },
        token: cookieAuth, // Return token in response body as well
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User login failed",
    });
  }
};

const logoutUser = async (req, res, next) => {
  try {
    res
      .cookie("cookie", "", {
        maxAge: 0,
        httpOnly: true,
      })
      .status(200)
      .json({
        success: true,
        message: "User logout successfully",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User logout failed",
    });
  }
};

const getUserById = async (req, res, next) => {
  try {
    const user = await userMode.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "get a user by id",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateUserById = async (req, res, next) => {
  try {
    const user = await userMode.findOne({ email: req.body.email });
    if (user) {
      res.status(409).json({
        success: false,
        message: "Email already exists",
      });
    }
    const updatedUser = await userMode.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User update failed",
    });
  }
};

const deleteUserById = async (req, res, next) => {
  try {
    const user = await userMode.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const refreshToken = async (req, res, next) => {
  try {
    // Get token from multiple sources
    const oldToken =
      req.body.oldToken ||
      req.cookies?.cookie ||
      req.headers.authorization?.replace("Bearer ", "");

    if (!oldToken) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    try {
      // Verify the old token
      const decoded = verifyUserToken(oldToken);

      // Find the user
      const user = await userMode.findOne({ email: decoded.email });

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }

      // Create a new token
      const newToken = tokenCreate(
        {
          email: user.email,
          password: user.password,
        },
        "7d"
      );

      // Set the new token as a cookie and send it back
      res
        .cookie("cookie", newToken, {
          maxAge: 7 * 24 * 60 * 60 * 1000,
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
          path: "/",
        })
        .status(200)
        .json({
          success: true,
          message: "Token refreshed successfully",
          token: newToken,
          data: {
            email: user.email,
            name: user.name,
            address: user.address,
            phone: user.phone,
            admin: user.admin,
            image: user.image,
          },
        });
    } catch (tokenError) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Token refresh failed",
    });
  }
};

module.exports = {
  getAllUser,
  signupUser,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser,
  logoutUser,
  refreshToken,
};
