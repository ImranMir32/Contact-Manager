const express = require("express");
const router = express.Router();

const {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

router.get("/", getAllContacts).post("/", createContact);
router
  .get("/:id", getContact)
  .put("/:id", updateContact)
  .delete("/:id", deleteContact);

module.exports = router;
