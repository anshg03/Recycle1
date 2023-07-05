const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const rateLimit = require("express-rate-limit");
const bodyParser = require("body-parser");
const authExtractor = require("./middleware/authExtractor");
const cors = require("cors");
const postRouter = require("./Routes/productRoute");

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const limiter = rateLimit({
  max: 100,
  windows: 60 * 60 * 1000,
  message: "Too many request from this IP, please try again in an hour!",
});

app.use("/api", limiter);

app.use("/api", require("./Routes/userRoute"));
app.use("/api/product", postRouter);

//const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
module.exports = app;
