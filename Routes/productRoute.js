const express = require("express");
const router = express.Router();

const { newproduct } = require("../controller/productController");

// Create a new product
router.post("/product", newproduct);

module.exports = router;
