const vendor = require("../models/Vendor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const Vendor = require("../models/Vendor");
dotenv.config();

const key = process.env.SECRETKEY;
const vendorRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const vemail = await vendor.findOne({ email });
    if (vemail) {
      return res.status(400).json("Email is already taken");
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newVendor = new vendor({ username, email, password: hashpassword });
    await newVendor.save();
    res.status(201).json({ message: "vendor register sucessfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const vendorLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const vendr = await vendor.findOne({ email });
    if (!vendr || !(await bcrypt.compare(password, vendr.password))) {
      return res.status(401).json({ error: "incorrect details" });
    }

    const token = jwt.sign({ vendorId: vendr._id }, key, { expiresIn: "1h" });

    res.status(200).json({ success: "login sucessfull", token });
    console.log(token);
    console.log(email);
  } catch (error) {
    console.log("error");
  }
};

const getAllvendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("firm");
    res.json({ vendors });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

const getvendorByid = async (req, res) => {
  const vendoId = req.params.id;
  try {
    const vendor = await Vendor.findById(vendoId);
    if (!vendor) {
      return res.status(404).json({ error: "vendor is not find" });
    }
    res.status(200).json({ vendor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};
module.exports = { vendorRegister, vendorLogin, getAllvendors, getvendorByid };
