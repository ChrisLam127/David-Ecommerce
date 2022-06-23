const express = require("express");
const router = express.Router();

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verify");

const {
  createCart,
  getCarts,
  getCart,
  updateCart,
  deleteCart,
} = require("../controllers/cart");

router.post("/", verifyToken, createCart);
router.get("/", verifyTokenAndAdmin, getCarts);
router.get("/find/:userId", verifyTokenAndAuthorization, getCart);
router.put("/:id", verifyTokenAndAuthorization, updateCart);
router.put("/:id", verifyTokenAndAuthorization, deleteCart);

module.exports = router;
