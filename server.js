require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const usersRoutes = require("./routes/usersRoutes.js");
const booksRoutes = require("./routes/booksRoutes");
const collectionsRoutes = require("./routes/collectionsRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", usersRoutes);

app.use("/books", booksRoutes);

app.use("/collections", collectionsRoutes);

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
