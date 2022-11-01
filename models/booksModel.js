const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  { comment: { type: String } },
  { timestamps: true }
);

const BooksSchema = new mongoose.Schema(
  {
    authorId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
    likes: [
      {
        type: String,
      },
    ],
    comments: [CommentSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Project_Books", BooksSchema);
