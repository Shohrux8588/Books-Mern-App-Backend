const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  { comment: { type: String } },
  { timestamps: true }
);

const CollectionsSchema = new mongoose.Schema(
  {
    authorId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    tags: [{ type: String, required: true }],
    likes: [{ type: String }],
    comments: [CommentSchema],
    integerFields: {
      type: [{ key: String, value: Number }],
    },
    stringFields: {
      type: [{ key: String, value: String }],
    },
    multilineFields: {
      type: [{ key: String, value: String }],
    },
    checkboxFields: {
      type: [{ key: String, value: Boolean }],
    },
    dateFields: {
      type: [{ key: String, value: Date }],
    },
    books: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project_Collections", CollectionsSchema);
