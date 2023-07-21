const Contacts = require("../models/contacts.model");

//@desc Create New contact
//@route POST /api/contacts
//@access public
const createContact = async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      return res.status(400).send({ massgae: "All field are mendatory " });
    }
    const newContact = new Contacts({
      name,
      email,
      phone,
    });
    await newContact.save();
    console.log(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//@desc Get all contacts
//@route GET /api/contacts
//@access public

const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contacts.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//@desc Get contact
//@route GET /api/contacts/:id
//@access public
const getContact = async (req, res) => {
  try {
    const contact = await Contacts.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ massgae: "Contact not found" });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//@desc Update contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = async (req, res) => {
  try {
    const contact = await Contacts.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ massgae: "Contact not found" });
    }
    const updateContact = await Contacts.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json(updateContact);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = async (req, res) => {
  try {
    const contact = await Contacts.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ massgae: "Contact not found" });
    }
    await Contacts.findByIdAndRemove(req.params.id);
    res.status(200).json({ massgae: `delete contact for ${req.params.id}` });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = {
  getAllContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
