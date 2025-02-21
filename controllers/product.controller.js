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

    const productOfCategory = await productModel.find({
      category: catagoryname,
    });

    res.json({
      success: true,
      message: "get all products in category",
      data: productOfCategory,
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
      title: req.body.title,
      subtitle: req.body.subtitle,
      category: req.body.category,
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

const addAProductVariant = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Create new variant object
    const newVariant = {
      packfrontimage: req.body.packfrontimage,
      packtitle: req.body.packtitle,
      description: req.body.description || "",
      allimagesinpack: req.body.allimagesinpack || [],
      quantity: req.body.quantity || 12,
      price: req.body.price,
    };

    // Add variant to product
    product.variants.push(newVariant);

    // If this is the first variant, set it as default
    if (product.variants.length === 1) {
      product.defaultVariant = product.variants[0].variantId;
    }

    const updatedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: "Added product variant successfully",
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
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

const getProductVariantById = async (req, res) => {
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
        message: "get a product variants by id",
        data: product.variants,
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

const deleteAllProduct = async (req, res) => {
  try {
    await productModel.deleteMany({});
    return res.status(200).json({
      success: true,
      message: "deleted all product",
    });
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
  addAProductVariant,
  getProductById,
  getProductVariantById,
  updateProductById,
  deleteAllProduct,
  deleteProductById,
};
