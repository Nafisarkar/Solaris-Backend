const express = require("express");
const {
  getAllProducts,
  getAllProductInCetagory,
  addAProduct,
  addAProductVariant,
  getProductById,
  getProductVariantById,
  updateProductById,
  deleteAllProduct,
  deleteProductById,
} = require("../controllers/product.controller");
const router = express.Router();

// get all products from database
router.get("/", getAllProducts);

// get all products from database of specific catagory
router.get("/category/:catagoryname", getAllProductInCetagory);

// add a product to the database
router.post("/", addAProduct);
// add a variant to the database
router.post("/:id", addAProductVariant);

// get a product but id
router.get("/:id", getProductById);

// get all the variant of a product
router.get("/variant/:id", getProductVariantById);

// update a product from database
router.put("/:id", updateProductById);

// delete a product from database
router.delete("/", deleteAllProduct);
// delete a product from database
router.delete("/:id", deleteProductById);

module.exports = router;
