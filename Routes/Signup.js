const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = "abcdef";
let i = 1;

router.post('/signup',
    [
        body("fullName").exists().withMessage("Enter a valid Name"),
        body("email").isEmail().withMessage("Enter a valid email"),
        body("password").exists().isLength({ min: 8 }).withMessage("Enter a password with atleast 8 characters"),
    ], async (req, res) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }

        const { fullName, email, password } = req.body
        try {
            let hashPassword = ""
            bcrypt(password, 10, (err, hash) => {
                if (err) {
                    console.log(err)
                    res.send("Server Error")
                } else {
                    hashPassword = hash
                }
            })

            const newUser = new User({
                userId: i,
                fullName: fullName,
                email: email,
                password: hashPassword
            })

            newUser.save()
                .then(() => {
                    console.log('New user created successfully')
                    i++;
                })
                .catch((error) => {
                    console.error('Error creating user:', error)
                    res.send("Error Ocurred")
                })

        }
        catch {
            console.error(error.message)
            res.send("Server Error")
        }
    })

module.exports = router;