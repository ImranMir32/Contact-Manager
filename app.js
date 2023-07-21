require("./config/db");
const express = require("express");
const app = express();
const contactRouter = require("./routes/contactRoutes");
const userRouter = require("./routes/userRoutes");

app.use(express.json());

app.use("/api/contacts", contactRouter);
app.use("/api/user", userRouter);

module.exports = app;
