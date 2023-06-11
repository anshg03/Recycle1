const twilio = require("twilio");
const AppError = require("../utils/appError");
const dotenv = require("dotenv");
dotenv.config({ path: ".../config.env" });

exports.sendOTP = (otp, phoneNo) => {
    const accountSid = process.env.accountSid;
    const authToken = process.env.authTokenTwilio;

    const client = twilio(accountSid, authToken);

    client.messages
        .create({
            body: 'Your otp for the mobilw verification is' + otp,
            to: "+91" + phoneNo,
            from: '+13613493707',
        })
        .then((message) => console.log("Message sent"));
}

exports.matchOTP = (otp, enterOTP) => {
    if (otp !== enterOTP) {
        new AppError("The otp entered is not matching", 409);
    }

    res.status(200).json({ message: "OTP verified" });
}