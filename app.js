require("./config/db");
const express = require("express");
const app = express();
const cors = require("cors");
const contactRouter = require("./routes/contactRoutes");
const userRouter = require("./routes/userRoutes");
const imgRouter = require("./routes/img.route");

app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactRouter);
app.use("/api/user", userRouter);

//img.route
app.use("/api/image", imgRouter);

module.exports = app;
