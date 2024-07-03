const express = require("express");
const productctl = require("../Controllers/Productctl");

const route = express.Router();

route.post("/addproduct/:firmId", productctl.AddProduct);
route.get("/addproduct/:firmId", productctl.productByfirm);
route.get("/uploads/:imageName", (req, res) => {
    const imageName = req.params.imageName;
    req.headersSent("Content-type", "image/jpeg");
    res.sendFile(path.join(__dirname, "..", "uploads", imageName));
  });

  route.delete("/:productid",productctl.deleteByid);
module.exports = route;
