const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      validate: [
        {
          validator: function (value) {
            return value.length >= 3;
          },
          message: "Name must be at least 3 characters",
        },
      ],
    },
    description: {
      type: String,
      required: true,
      validate: [
        {
          validator: function (value) {
            return value.length >= 3;
          },
          message: "Description must be at least 3 characters",
        },
      ],
    },
    size: {
      type: String,
      required: true,
    },
    exclusive: {
      type: Boolean,
      required: true,
      default: false,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrls: {
      type: [String],
      required: true,
      default: [],
    },
    category: {
      type: String,
      required: true,
      default: "",
    },
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    containsItem: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
