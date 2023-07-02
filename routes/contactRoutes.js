const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({ massgae: "get all the contacts" });
});

router.post("/", (req, res) => {
  res.json({ massgae: "create contact" });
});

router.get("/:id", (req, res) => {
  res.status(200).json({ massgae: `get contact for ${req.params.id}` });
});

router.put("/:id", (req, res) => {
  res.status(200).json({ massgae: `update contact for ${req.params.id}` });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({ massgae: `delete contact for ${req.params.id}` });
});

module.exports = router;
