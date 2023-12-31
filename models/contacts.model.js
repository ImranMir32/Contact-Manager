const mongoose = require("mongoose");

const contactsSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Users",
    },
    name: {
      type: String,
      required: [true, "Please add the contact name"],
    },
    email: {
      type: String,
      required: [true, "Please add the contact email address"],
    },
    phone: {
      type: String,
      required: [true, "Please add the contact phone number"],
    },
    category: {
      type: String,
      required: [true, "Please add category"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contacts", contactsSchema);
