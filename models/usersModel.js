const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "user",
    },
    blocked: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project_Users", UsersSchema);
