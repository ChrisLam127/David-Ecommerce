const express = require("express");
const router = express.Router();

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verify");

const {
  updateUser,
  getUser,
  getUsers,
  deleteUser,
} = require("../controllers/user");

router.get("/", verifyTokenAndAdmin, getUsers);
router.get("/find/:id", verifyTokenAndAdmin, getUser);
router.put("/:id", verifyTokenAndAuthorization, updateUser);
router.delete("/:id", verifyTokenAndAuthorization, deleteUser);

module.exports = router;
