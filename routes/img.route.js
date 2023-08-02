const express = require("express");
const router = express.Router();
const validateToken = require("../middleware/validateTokenHandler");
const multer = require("multer");

const {
  imgUpload,
  getImg,
  updateImg,
} = require("../controllers/img.controller");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// router.use(validateToken);
router.post("/upload", upload.single("testImage"), imgUpload);
router.get("/:id", getImg);
router.put("/:id", upload.single("testImage"), updateImg);

module.exports = router;
