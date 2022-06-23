const Product = require("../models/Product");

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  const { title, price, qty, inStock, desc, dimension, material, isBook } =
    req.body;
  if (req.user.isAdmin) {
    try {
      const product = await Product.create({
        title,
        price,
        qty,
        inStock,
        desc,
        dimension,
        material,
        isBook,
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(403).json({ success: false, msg: error.message });
  }
};

// GET ALL PRODUCTS
exports.getProducts = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const products = await Product.find();
      res.status(200).json({ success: true, products: products.reverse() });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(403).json({ success: false, msg: "You are not authorized!" });
  }
};

// GET ONE PRODUCT
exports.getOneProduct = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).json({ success: true, product: product });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(403).json({ success: false, msg: "You are not authorized!" });
  }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json({ success: true, product: product });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(403).json({ success: false, msg: "You are not authorized!" });
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ success: true, msg: "Product deleted successfully..." });
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(403).json({ success: false, msg: "You are not authorized" });
  }
};
