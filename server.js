require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user.js");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRoutes);

mongoose
  .connect(process.env.MONGODB_KEY)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT, () => {
      console.log(`App is listening on ${process.env.PORT}...`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
