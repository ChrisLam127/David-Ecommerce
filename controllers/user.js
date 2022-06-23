const User = require("../models/User");
const CryptoJS = require("crypto-js");

//UPDATE USER
exports.updateUser = async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET
    ).toString();
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json({ success: true, updatedUser });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//DELETE USER
exports.deleteUser = async (req, res) => {
  try {
    await User.deleteById(req.params.id);
    res
      .status(200)
      .json({ success: true, msg: "User deleted successfully..." });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//GET USER
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json({ success: true, others });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//GET ALL USERS
exports.getUsers = async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
