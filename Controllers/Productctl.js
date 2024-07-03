const Product = require("../models/Product");
const multer = require("multer");
const Firm = require("../models/Firm");
const storage = multer.diskStorage({
  destination: "./uploads/", // specify the destination directory
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Create the multer instance
const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
  try {
    const { productName, price, category, bestSeller, description } = req.body;
    const image = req.file ? req.file.filename : undefined;

    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);

    if (!firm) {
      return res.status(404).json({ error: "No firm found" });
    }

    const product = new Product({
      productName,
      price,
      category,
      bestSeller,
      description,
      image,
      firm: firm._id,
    });

    const savedProduct = await product.save();
    firm.product.push(savedProduct);

    await firm.save();

    res.status(200).json(savedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const productByfirm = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);
    if (!firm) {
      return res.status(404).json({ error: "No firm found for product id" });
    }

    const restraunatname = firm.firmName;
    const product = await Product.find({ firm: firmId });

    res.status(200).json({ restraunatnamename, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteByid = async (req, res) => {
  try {
    const productId = req.params.productId;
    const deleteproduct = await Product.findByIdAndDelete(productId);
    if (!deleteproduct) {
      return res.status(404).json({ error: "No product" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  AddProduct: [upload.single("image"), addProduct],
  productByfirm,
  deleteByid,
};
