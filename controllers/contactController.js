//@desc Create New contact
//@route POST /api/contacts
//@access public
const createContact = async (req, res) => {
  try {
    res.json({ massgae: "create contact" });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getAllContacts = async (req, res) => {
  try {
    res.status(200).json({ massgae: "get all the contacts " });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//@desc Get contact
//@route GET /api/contacts/:id
//@access public
const getContact = async (req, res) => {
  try {
    res.status(200).json({ massgae: `get contact for ${req.params.id}` });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//@desc Update contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = async (req, res) => {
  try {
    res.status(200).json({ massgae: `update contact for ${req.params.id}` });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = async (req, res) => {
  try {
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
