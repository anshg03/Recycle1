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
  phoneNo: {
    type: Number,
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
  },
  amount: {
    type: Number,
    required: true,
  },
  otp: {
    type: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const PRODUCT = mongoose.model("PRODUCT", productSchema, 'products');
module.exports = PRODUCT;
