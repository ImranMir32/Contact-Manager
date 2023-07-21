const mongoose = require("mongoose");

const contactsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      reuire: true,
    },
    email: {
      type: String,
      require: true,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Contacts", contactsSchema);
