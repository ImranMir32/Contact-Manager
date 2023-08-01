const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  currentUser,
  updateUser,
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);
router.put("/:id", validateToken, updateUser);

module.exports = router;
