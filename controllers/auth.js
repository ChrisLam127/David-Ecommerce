const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
exports.register = async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      // Encrypting the password before storing it in the db
      req.body.password,
      process.env.SECRET
    ).toString(),
  });
  try {
    const user = await newUser.save();
    res.status(200).json({ sucess: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

//LOGIN
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, msg: "Please provide email and password!" });
  }

  try {
    const user = await User.findOne({ email: req.body.email });
    !user &&
      res
        .status(400)
        .json({ success: false, msg: "No user found with this email!" });

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      return res
        .status(401)
        .json({ sucess: false, msg: "Wrong Email or Password" });
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET,
      { expiresIn: process.env.EXPIRES }
    );

    const { password, ...info } = user._doc;

    res.status(200).json({ success: true, ...info, accessToken });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
