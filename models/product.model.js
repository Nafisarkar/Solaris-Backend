const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const singleProductSchema = new mongoose.Schema(
  {
    variantId: {
      type: String,
      default: () => uuidv4(),
      required: true,
      // removed unique: true as it causes issues with embedded documents
    },
    packfrontimage: {
      type: String,
      required: [true, "Front image is required"],
    },
    packtitle: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      default: "",
    },
    allimagesinpack: {
      type: [String],
      default: [],
    },
    quantity: {
      type: Number,
      default: 12,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
    },
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minLength: [3, "Title must be at least 3 characters"],
    },
    subtitle: {
      type: String,
      required: [true, "Subtitle is required"],
      minLength: [3, "Subtitle must be at least 3 characters"],
    },
    category: {
      type: String,
      default: "other",
      required: [true, "Category is required"],
    },
    variants: [singleProductSchema],
    defaultVariant: {
      type: String, // Store the variantId of the default variant
      ref: "variants.variantId",
    },
  },
  {
    timestamps: true,
  }
);

// Add a compound index on parent document to ensure unique variantIds within a product
productSchema.index(
  { "variants.variantId": 1 },
  { unique: true, sparse: true }
);

module.exports = mongoose.model("Product", productSchema);
