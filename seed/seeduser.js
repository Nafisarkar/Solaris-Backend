const express = require("express");
const userModel = require("../models/user.model");
const { faker } = require("@faker-js/faker");
const userScopeValidator = require("../helper/userScopeValidator");
const adminScopeValidator = require("../helper/adminScopeValidator");
const router = express.Router();

router.post("/", userScopeValidator, adminScopeValidator, async (req, res) => {
  try {
    const number = 5;
    const users = [];
    for (let i = 0; i < number; i++) {
      users.push({
        name: faker.person.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        address: faker.location.streetAddress(),
        phone: faker.phone.number({
          style: "international",
        }),
        admin: faker.datatype.boolean(),
        image: faker.image.avatar(),
      });
    }

    await userModel.insertMany(users);
    res.status(200).json({
      message: `created ${number} users`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

router.post(
  "/:id",
  userScopeValidator,
  adminScopeValidator,
  async (req, res) => {
    try {
      const number = req.params.id;
      const users = [];
      for (let i = 0; i < number; i++) {
        users.push({
          name: faker.person.firstName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          address: faker.location.streetAddress(),
          phone: faker.phone.number({
            style: "international",
          }),
          admin: faker.datatype.boolean(),
          image: faker.image.avatar(),
        });
      }

      await userModel.insertMany(users);
      res.status(200).json({
        success: true,
        message: `created ${number} users`,
        data: users,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
);

module.exports = router;
