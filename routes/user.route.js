const express = require("express");
const router = express.Router();
const {
  signupValidatorRules,
  loginValidatorRules,
} = require("../validator/validator.rules");
const {
  getAllUser,
  signupUser,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
  loginUser,
  logoutUser,
} = require("../controllers/user.controller");
const { validator } = require("../validator/validator.controller");
const adminScopeValidator = require("../helper/adminScopeValidator");
const userScopeValidator = require("../helper/userScopeValidator");

//get all users
router.get("/", userScopeValidator, adminScopeValidator, getAllUser);
//sign up new user
router.post("/signup", signupValidatorRules, validator, signupUser);
//create user on the database
router.get("/register", createUser);
//login user and give a cookie
router.post("/login", loginValidatorRules, validator, loginUser);
//logout user and remove a cookie
router.delete("/logout", logoutUser);
//get a user by id
router.get("/:id", userScopeValidator, adminScopeValidator, getUserById);
//update a user by id
router.put("/:id", userScopeValidator, adminScopeValidator, updateUserById);
//delete a user by id
router.delete("/:id", adminScopeValidator, deleteUserById);

module.exports = router;
