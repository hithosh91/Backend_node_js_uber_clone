const express = require("express");
const dotEnv = require("dotenv");
const mongoose = require("mongoose");
const vendorroute = require("./Routes/VendorRoutes");
const bodyparser = require("body-parser");
const firmroute = require("./Routes/Firmroute");
const productRoute = require("./Routes/Productroute");
const path = require("path");
const app = express();

dotEnv.config();

//connection mongoose

const port = process.env.Port;
mongoose
  .connect(process.env.MongoUrl)
  .then(() => {
    console.log("Db is connected");
  })
  .catch((error) => {
    console.log(error);
  });
app.use(bodyparser.json());
app.use("/vendor", vendorroute);
app.use("/firm", firmroute);
app.use("/product", productRoute);
app.use("/uploads", express.static("uploads"));

app.listen(port, () => {
  console.log("server is running on 4000");
});

app.use("/home", (req, res) => {
  res.send("<h1>Hello world</h1>");
});
