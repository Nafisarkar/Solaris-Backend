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
  deleteAProductVariantById,
  deleteProductById,
} = require("../controllers/product.controller");
const userScopeValidator = require("../helper/userScopeValidator");
const adminScopeValidator = require("../helper/adminScopeValidator");
const router = express.Router();

// get all products from database
router.get("/", getAllProducts);

// get all products from database of specific catagory
router.get("/category/:catagoryname", getAllProductInCetagory);

// add a product to the database
router.post("/", userScopeValidator, adminScopeValidator, addAProduct);
// add a variant to the database
router.post(
  "/:id",
  userScopeValidator,
  adminScopeValidator,
  addAProductVariant
);

// get a product but id
router.get("/:id", getProductById);

// get all the variant of a product
router.get("/variant/:id", getProductVariantById);

// update a product from database
router.put("/:id", userScopeValidator, adminScopeValidator, updateProductById);

// delete all product from database
router.delete("/", userScopeValidator, adminScopeValidator, deleteAllProduct);

// delete a product varient from database by id
router.delete(
  "/:pid/:vid",
  userScopeValidator,
  adminScopeValidator,
  deleteAProductVariantById
);

// delete a product from database by id
router.delete(
  "/:id",
  userScopeValidator,
  adminScopeValidator,
  deleteProductById
);

module.exports = router;
