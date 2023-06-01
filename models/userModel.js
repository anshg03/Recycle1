const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  fullName: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    reqired: [true, "Email is required"],
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// userSchema.pre("save", function (next) {
//   bcrypt.hash(this.password, 10, (err, hash) => {
//     if (err) {
//       next(err);
//       console.log(err);
//       res.send("Password Hashing Server Error");
//     } else {
//       this.password = hash;
//       next();  
//     }
//   });
// })

const USER = mongoose.model("USER", userSchema);
module.exports = USER;
