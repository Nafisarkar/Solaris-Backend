const productModel = require("../models/product.model");

const getAllProducts = async (req, res) => {
  try {
    const allProduct = await productModel.find({});
    res.json({
      success: true,
      message: "get all products",
      data: allProduct,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const getAllProductInCetagory = async (req, res) => {
  try {
    const { catagoryname } = req.params;

    const productOfCatagory = await productModel.find({
      category: catagoryname,
    });

    res.json({
      success: true,
      message: "get all products in cetagory",
      data: productOfCatagory,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const addAProduct = async (req, res) => {
  try {
    const newProduct = new productModel({
      name: req.body.name,
      description: req.body.description,
      size: req.body.size,
      exclusive: req.body.exclusive,
      price: req.body.price,
      imageUrls: req.body.imageUrls,
      category: req.body.category,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      containsItem: req.body.containsItem,
    });

    await newProduct.save();

    res.json({
      success: true,
      message: "added a product",
      data: newProduct,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product) {
      return res.status(200).json({
        success: true,
        message: "get a product by id",
        data: product,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const updateProductById = async (req, res) => {
  try {
    const id = req.params.id;

    const product = await productModel.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found to update",
      });
    }
    if (product) {
      const updatedProduct = await productModel.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

      return res.status(200).json({
        success: true,
        message: "updated a product by id",
        data: updatedProduct,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await productModel.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Product not found to delete",
      });
    } else {
      await productModel.findByIdAndDelete(id);
      return res.status(200).json({
        success: true,
        message: "delete a product by id",
        data: user,
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getAllProductInCetagory,
  addAProduct,
  getProductById,
  updateProductById,
  deleteProductById,
};
