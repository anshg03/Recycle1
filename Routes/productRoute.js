const express = require("express");
const { body } = require("express-validator");
const router = express.Router();
const app = express();
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config({ path: ".../config.env" });
const twilio = require("twilio");


const { newPost } = require("../controllers/productController");
const { sendOTP } = require("../controllers/otpController");
const exp = require("constants");

// Create a new product
router.route("/sell").post(
    [
        body("name").exists().withMessage("enter the name of the product"),
        body("email").isEmail().withMessage("enter a valid email"),
        body("amount").exists().withMessage("enter a valid amount"),
        body("proImage").exists().isLength({ min: 1, max: 5 }).withMessage("submitting images is compulsory"),
        body("description").exists().withMessage("enter the description"),
        body("phoneNo").exists().isLength(10).withMessage("enter a vlid phone number")
    ],
    newPost
);

router.route("/sell/verifydetails").post([
    body("otp").exists(),
    body("phoneNo").exists()
], sendOTP);


module.exports = router;
