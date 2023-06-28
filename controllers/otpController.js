const twilio = require("twilio");
const AppError = require("../Utils/appError");
const dotenv = require("dotenv");
const Product = require("../models/productModel");
dotenv.config({ path: ".../config.env" });
const { catchAsync } = require("../Utils/catchAsync");

exports.sendOTP = catchAsync(async (req, res, next) => {
  const accountSid = process.env.accountSid;
  const authToken = process.env.authTokenTwilio;
  console.log(req);
  const client = twilio(accountSid, authToken);

  client.messages
    .create({
      body: "Your OTP for mobile verification is: " + req.otp,
      to: "+91" + req.phoneNo,
      from: "+13613493707",
    })
    .then((message) => console.log("Message sent"));
  return res.status(201)
});

exports.matchOTP = (otp, enterOTP, res) => {
  if (otp !== enterOTP) {
    throw new AppError("The OTP entered does not match", 409);
  }

  res.status(200).json({ message: "OTP verified" });
};
