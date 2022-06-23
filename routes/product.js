const express = require("express");
const {
  updateProduct,
  getOneProduct,
  getProducts,
  createProduct,
  deleteProduct,
} = require("../controllers/products");
const { verifyToken } = require("../middlewares/verify");

const router = express.Router();

router.post("/", verifyToken, createProduct);
router.get("/", verifyToken, getProducts);
router.get("/:id", verifyToken, getOneProduct);
router.put("/:id", verifyToken, updateProduct);
router.delete("/:id", verifyToken, deleteProduct);

module.exports = router;
