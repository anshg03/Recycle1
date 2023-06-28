const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const app = express();
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config({ path: ".../config.env" });
const twilio = require("twilio");


const { newPost } = require("../controllers/productController");
const { sendOtp, } = require("../controllers/otpController");
const exp = require("constants");

// Create a new product
router.route("/sell").post(
    [
        body("name").exists().withMessage("enter the name of the product"),
        body("email").isEmail().withMessage("Enter a valid email"),
        body("amount").exists().withMessage("enter a valid amount"),
        body("proImage").exists().isLength({ min: 1, max: 5 }).withMessage("submitting images is cumpulsory"),
        body("description").exists().withMessage("enter the description"),
        body("phoneNo").exists().isLength(10).withMessage("enter a vlid phone number")
    ],
    newPost
);

// router.route("/sell/verifydetails").post([
//     body("otp").exists().withMessage("skvs"),
//     body("phoneNo").exists().withMessage("svcsdv")
// ], sendOtp);


module.exports = router;
