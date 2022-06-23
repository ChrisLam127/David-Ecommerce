const express = require("express");
const router = express.Router();

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verify");

const {
  createOrder,
  getOrders,
  getOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/Order");

router.post("/", verifyToken, createOrder);
router.get("/", verifyTokenAndAdmin, getOrders);
router.get("/find/:userId", verifyTokenAndAuthorization, getOrder);
router.put("/:id", verifyTokenAndAuthorization, updateOrder);
router.put("/:id", verifyTokenAndAuthorization, deleteOrder);

module.exports = router;
