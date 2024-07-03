const express = require("express");

const vendorCtl = require("../Controllers/VendorCtl");

const routes = express.Router();

routes.post("/register", vendorCtl.vendorRegister);
routes.post("/login", vendorCtl.vendorLogin);
routes.get("/getall", vendorCtl.getAllvendors);
routes.get("/getid/:id", vendorCtl.getvendorByid);
module.exports = routes;
