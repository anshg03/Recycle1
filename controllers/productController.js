const AppError = require("../Utils/appError");
const { catchAsync } = require("../Utils/catchAsync");
const User = require("../models/userModel");
const { promisify } = require("util");

const Product = require("../models/productModel");

exports.newpost = catchAsync(async (req, res, next) => {
  const token = req.cookies.token;

  const decoded = promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const user = await User.findOne({ email: decoded.data.email });

  if (!user) {
    return next(
      new AppError("You are not allowed to perform this action", 401)
    );
  }

  const { proImage, name, description, tags, time, amount } = req.body;

  const post = new Product({
    proImage,
    name,
    description,
    tags,
    time,
    amount,
  });

  await Product.save();

  res.status(201).json({ message: "Post created successfully", post });
});
