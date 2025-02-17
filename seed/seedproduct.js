const express = require("express");

const { faker } = require("@faker-js/faker");
const productModel = require("../models/product.model");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const number = req.body.number || 15;
    const products = [];
    for (let i = 0; i < number; i++) {
      products.push({
        name: [
          "Attack on Tital",
          "Alien Rumelus",
          "Superman",
          "Fantastic Four",
        ][faker.number.int(3)],
        description: faker.commerce.productDescription(),
        size: ["A4", "A5", "A7"][faker.number.int(2)],
        exclusive: faker.datatype.boolean(),
        price: parseFloat(
          faker.commerce.price({
            min: 599,
            max: 1299,
          })
        ),
        imageUrls: [faker.image.url(), faker.image.url(), faker.image.url()],
        category: ["anime", "movie", "game", "music", "art"][
          faker.number.int(4)
        ],
        rating: faker.number.int({ min: 1, max: 5 }),
        numReviews: faker.number.int({ min: 0, max: 100 }),
        containsItem: faker.number.int({ min: 1, max: 12 }),
      });
    }

    await productModel.insertMany(products);
    res.status(200).json({
      message: `created ${number} Products`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
