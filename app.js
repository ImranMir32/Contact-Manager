const express = require("express");
const app = express();
const contactRouter = require("./routes/contactRoutes");

app.use("/api/contacts", contactRouter);

module.exports = app;
