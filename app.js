require("./config/db");
const express = require("express");
const app = express();
const contactRouter = require("./routes/contactRoutes");

app.use(express.json());

app.use("/api/contacts", contactRouter);

module.exports = app;
