const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userId: {
        type: Number,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: [true, "Name is required"],
    },
    email: {
        type: String,
        reqired: [true, "Email is required"],
        lowercase: true,
        unique: true,
        validate: {
            validator: function (value) {
                return "/\S+@\S+\.\S+/".test(value);
            },
            message: 'Invalid email address',
        }
    },
    password: {
        type: String,
        required: true
    }
});

const USER = mongoose.model("USER", userSchema);
module.exports = USER;