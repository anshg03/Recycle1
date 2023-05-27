const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  productId: {
    type: Number,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, "A name is required"],
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  proImage: {
    type: String,
    reqired: [true, "Image is required"],
  },
  creationTime: {
    type: Date,
    default: Date.now(),
  },
  email: {
    type: String,
    reqired: [true, "Email is required"],
    lowercase: true,
    unique: true,
    validate: {
      validator: function (value) {
        return "/S+@S+.S+/".test(value);
      },
      message: "Invalid email address",
    },
  },
  amount: {
    type: Number,
    required: true,
  },
});

const PRODUCT = mongoose.model("PRODUCT", productSchema);
module.exports = PRODUCT;
