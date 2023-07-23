const express = require("express");
const router = express.Router();

const {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

//as we need to protect all the route so we can use in this way
router.use(validateToken);
router.get("/", getAllContacts).post("/", createContact);
router
  .get("/:id", getContact)
  .put("/:id", updateContact)
  .delete("/:id", deleteContact);

module.exports = router;
