const express = require("express");
const dotenv = require("dotenv");
const dataRouter = require("./Routes/Login");
dotenv.config({ path: "./config.env" });
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/Login", require("./Routes/userRoute"));
app.use("/api/signup", require("./Routes/userRoute"));

//const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`);
// });
module.exports = app;
