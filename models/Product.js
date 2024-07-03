const mongoose = require("mongoose");

const productschema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
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

  image: {
    type: String,
  },
  bestSeller: {
    type: String,
  },
  description: {
    type: String,
  },
  firm: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Firm",
    },
  ],
});

module.exports = mongoose.model("Product", productschema);
