const express = require("express");
const {
  getAllProducts,
  getAllProductInCetagory,
  addAProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/product.controller");
const router = express.Router();

// get all products from database
router.get("/", getAllProducts);

// get all products from database of specific catagory
router.get("/cetagory/:catagoryname", getAllProductInCetagory);

// add a product to the database
router.post("/", addAProduct);

// get a product but id
router.get("/:id", getProductById);

// update a product from database
router.put("/:id", updateProductById);

// delete a product from database
router.delete("/:id", deleteProductById);

module.exports = router;
