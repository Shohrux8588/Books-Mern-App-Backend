const express = require("express");
const router = express.Router();

const {
  createBook,
  editBook,
  deleteBook,
  fetchBooks,
  fetchBook
} = require("../controllers/booksControllers");

const requireAuth = require("../middleware/requireAuth");

router.get("/", fetchBooks);

router.get("/:id", fetchBook);

router.use(requireAuth);

router.post("/", createBook);

router.post("/:id", editBook);

router.delete("/:id", deleteBook);

module.exports = router;
