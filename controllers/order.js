const Order = require("../models/Order");

//CREATE Order
exports.createOrder = async (req, res) => {
  const newOrder = new Order(req.body);
  try {
    const savedOrder = await newOrder.save();
    res.status(200).json({ success: true, Order: savedOrder });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};

// UPDATE Order
exports.updateOrder = async (req, res) => {
  const OrderId = req.params.id;
  try {
    const updatedOrder = await Order.findAndUpdate(
      OrderId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ success: true, updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// DELETE Order
exports.deleteOrder = async (req, res) => {
  const OrderId = req.params.id;
  try {
    await Order.findByIdAndDelete(OrderId);
    res.status(200).json({ success: true, msg: "Order has been deleted..." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET USER Order
exports.getOrder = async (req, res) => {
  try {
    const Order = await Order.findById({ userId: req.params.userId });
    res.status(200).json({ success: true, Order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET ALL
exports.getOrders = async (req, res) => {
  try {
    const Order = await Order.find();
    res.status(200).json({ success: true, Order });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
