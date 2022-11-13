const express = require("express");

const Book = require("../../models/book");
const fileMulter = require("../../middleware/file");

const router = express.Router();

router.get("/", async (_, res) => {
  try {
    const bookList = await Book.find().select("-__v");

    res.status(200).json(bookList);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id).select("-__v");

    res.status(200).json(book);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.post("/", fileMulter.single("fileBook"), async (req, res) => {
  const { title, description, authors, favorite, fileCover } = req.body;
  let fileName = "";
  if (req.file) {
    fileName = req.file.path;
  }
  const newBook = new Book({
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
  });
  try {
    await newBook.save();

    res.status(201).json(newBook);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.put("/:id", fileMulter.single("fileBook"), async (req, res) => {
  const { id } = req.params;
  const { title, description, authors, favorite, fileCover } = req.body;
  let fileName = "";
  if (req.file) {
    fileName = req.file.path;
  }

  try {
    await Book.findByIdAndUpdate(id, {
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
    });
    res.redirect(`/api/books/${id}`);
  } catch (e) {
    res.status(500).json(e);
  }
});

router.delete("/:id", async (req, res) => {
  const { id: _id } = req.params;

  try {
    await Book.deleteOne({
      _id,
    });
    res.json("ok");
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
