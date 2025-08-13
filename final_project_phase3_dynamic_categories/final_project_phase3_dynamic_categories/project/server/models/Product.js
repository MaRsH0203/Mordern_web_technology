const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    inStock: { type: Boolean, default: true },
    image: { type: String, default: "" } 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);