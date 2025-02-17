const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      validate: [
        {
          validator: function (v) {
            return v.length >= 3;
          },
          message: "Name must be at least 3 characters",
        },
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [
        {
          validator: function (v) {
            const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return re.test(v);
          },
          message: "Please enter a valid email",
        },
      ],
    },
    password: {
      type: String,
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
      required: true,
    },
    address: {
      type: String,
      default: "",
      validate: {
        validator: function (v) {
          return v.length >= 3;
        },
        message: "Address must be at least 3 characters",
      },
    },
    phone: {
      type: String,
      default: "",
      validate: [
        {
          validator: function (v) {
            return v.length > 10;
          },
          message: "Phone must be more than 10 characters",
        },
      ],
    },
    admin: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model("User", userSchema);
