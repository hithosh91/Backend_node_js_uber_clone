const mongoose = require("mongoose");

const FirmSchema = new mongoose.Schema({
  firmName: {
    type: String,
    required: true,
    unique: true,
  },
  area: {
    type: String,
    required: true,
  },
  category: [
    {
      type: String,
      enum: ["VEG", "NON-VEG", "VEGAN"],
      required: true,
    },
  ],
  region: [
    {
      type: String,
      enum: ["continental", "asian", "mediterranean"],
      required: true,
    },
  ],
  offer: {
    type: String,
  },
  image: {
    type: String,
  },
  vendor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendor",
    },
  ],
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

module.exports = mongoose.model("Firm", FirmSchema);
