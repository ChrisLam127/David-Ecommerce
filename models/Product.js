const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    qty: { type: Number },
    inStock: { type: Number },
    desc: { type: String },
    img: { type: String, default: "" },
    dimension: { type: String, default: "" },
    material: { type: String, default: "" },
    isBook: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
