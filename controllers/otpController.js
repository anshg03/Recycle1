const twilio = require("twilio");
const AppError = require("../Utils/appError");
const dotenv = require("dotenv");
const Product = require("../models/productModel");
dotenv.config({ path: ".../config.env" });
const { catchAsync } = require("../Utils/catchAsync");

exports.sendOTP = catchAsync(async (otp, productId) => {
  const accountSid = process.env.accountSid;
  const authToken = process.env.authTokenTwilio;

  const client = twilio(accountSid, authToken);

  const product = await Product.findOne({ productId });
  if (!product) {
    throw new AppError("Product not found", 404);
  }

  const phoneNo = product.phoneNo;

  client.messages
    .create({
      body: "Your OTP for mobile verification is: " + otp,
      to: "+91" + phoneNo,
      from: "+13613493707",
    })
    .then((message) => console.log("Message sent"));
});

exports.matchOTP = (otp, enterOTP, res) => {
  if (otp !== enterOTP) {
    throw new AppError("The OTP entered does not match", 409);
  }

  res.status(200).json({ message: "OTP verified" });
};
