const Firm = require("../models/Firm");
const Vendor = require("../models/Vendor");
const multer = require("multer");

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

const addFirm = async (req, res) => {
  try {
    const { firmName, area, category, region, offer } = req.body;

    const image = req.file ? req.file.filename : undefined;

    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) {
      res.status(404).json({ message: "Vendor not found" });
    }

    const firm = new Firm({
      firmName,
      area,
      category,
      region,
      offer,
      image,
      vendor: vendor._id,
    });

    const savedFirm = await firm.save();
    vendor.firm.push(savedFirm);

    await vendor.save();
    return res.status(200).json({ messae: "DATA SAVED" });
  } catch (error) {
    console.error(error);
    res.status(500).json("internal server error");
  }
};

const deletefirmid = async (req, res) => {
  try {
    const firmId = req.params.firmId;
    const deletefirm = await Firm.findByIdAndDelete(FirmId);
    if (!deletefirm) {
      return res.status(404).json({ error: "No product" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { addFirm: [upload.single("image"), addFirm], deletefirmid };
