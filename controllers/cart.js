const Cart = require("../models/Cart");

//CREATE CART
exports.createCart = async (req, res) => {
  const newCart = new Cart(req.body);
  try {
    const savedCart = await newCart.save();
    res.status(200).json({ success: true, cart: savedCart });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};

// UPDATE CART
exports.updateCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    const updatedCart = await Cart.findAndUpdate(
      cartId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ success: true, updatedCart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE CART
exports.deleteCart = async (req, res) => {
  const cartId = req.params.id;
  try {
    await Cart.findByIdAndDelete(cartId);
    res.status(200).json({ success: true, msg: "Cart has been deleted..." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET USER CART
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findById({ userId: req.params.userId });
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET ALL
exports.getCarts = async (req, res) => {
  try {
    const cart = await Cart.find();
    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
