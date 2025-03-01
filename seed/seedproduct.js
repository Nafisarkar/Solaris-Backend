const express = require("express");
const { faker } = require("@faker-js/faker");
const productModel = require("../models/product.model");
const adminScopeValidator = require("../helper/adminScopeValidator");
const userScopeValidator = require("../helper/userScopeValidator");
const router = express.Router();

router.post("/", userScopeValidator, adminScopeValidator, async (req, res) => {
  try {
    const number = req.body.number || 2;
    const products = [];

    const titles = [
      "Attack on Titan",
      "Alien Rumelus",
      "Superman",
      "Fantastic Four",
      "Avengers",
      "Justice League",
      "Star Wars",
      "The Matrix",
      "The Lord of the Rings",
      "Harry Potter",
      "The Hobbit",
      "Star Wars",
      "The Matrix",
    ];

    const categories = ["anime", "car", "movie", "asthetic"];

    for (let i = 0; i < number; i++) {
      const title = titles[faker.number.int(12)];

      // Create variants
      const variants = Array.from(
        { length: faker.number.int({ min: 1, max: 12 }) },
        () => ({
          packfrontimage: faker.image.url(),
          packtitle: `${title} - ${faker.commerce.productAdjective()}`,
          description: faker.commerce.productDescription().slice(0, 100),
          allimagesinpack: [
            faker.image.url(),
            faker.image.url(),
            faker.image.url(),
          ],
          quantity: faker.number.int({ min: 1, max: 12 }),
          price: parseFloat(
            faker.commerce.price({
              min: 300,
              max: 1200,
            })
          ),
        })
      );
      products.push({
        title,
        subtitle: faker.commerce.productDescription().slice(0, 50),
        category: categories[faker.number.int(3)],
        variants: variants,
      });
    }

    const createdProducts = await productModel.insertMany(products);

    // Update each product with a random variant as default
    const updatedProducts = await Promise.all(
      createdProducts.map(async (product) => {
        if (product.variants.length > 0) {
          const randomVariantIndex = faker.number.int({
            min: 0,
            max: product.variants.length - 1,
          });
          product.defaultVariant = product.variants[randomVariantIndex]._id;
          return await product.save();
        }
        return product;
      })
    );

    res.status(200).json({
      success: true,
      message: `Created ${updatedProducts.length} products with variants successfully`,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
