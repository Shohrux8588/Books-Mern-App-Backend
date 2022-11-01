const Books = require("../models/booksModel");

const fetchBooks = async (req, res) => {
  try {
    const allBooks = await Books.find().sort({ updatedAt: -1 });
    return res.status(200).json(allBooks);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const fetchBook = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Books.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const createBook = async (req, res) => {
  const { name, description, authorId } = req.body;
  const tags = req.body.tags || [];

  try {
    const book = await Books.create({
      authorId,
      name,
      description,
      tags,
      likes: [],
      comments: [],
    });
    return res.status(200).json(book);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const editBook = async (req, res) => {
  try {
    const updatedBook = await Books.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(updatedBook);
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    const deletedBook = await Books.findByIdAndRemove(req.params.id);
    return res.status(200).json(deletedBook);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = { createBook, editBook, deleteBook, fetchBooks, fetchBook };
