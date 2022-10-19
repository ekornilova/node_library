const express = require("express");
const pageNotFound = require("../helpers/pageNotFound.js");
const { store } = require("../libraryStoreClass.js");
const { addBook, deleteBook, editBook, getBooks, getBook } = store;
const fileMulter = require("../middleware/file");

const router = express.Router();

router.get("/", (_, res) => {
  res.json(getBooks());
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = getBook(id);

  if (book) {
    res.json(book);
  } else {
    pageNotFound(res);
  }
});

router.post("/", fileMulter.single("fileBook"), (req, res) => {
  let fileBook = "";
  if (req.file) {
    fileBook = req.file.path;
  }
  const book = addBook({ ...req.body, fileBook });

  res.status(201);
  res.json(book);
});

router.put("/:id", fileMulter.single("fileBook"), (req, res) => {
  const { id } = req.params;
  const patchData = { ...req.body, id };
  if (req.file) {
    patchData.fileBook = req.file.path;
  }
  const book = editBook(patchData);

  if (book) {
    res.json(book);
  } else {
    pageNotFound(res);
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const isDeleted = deleteBook(id);

  if (isDeleted) {
    res.json("ok");
  } else {
    pageNotFound(res);
  }
});

router.get("/:id/download", (req, res) => {
  const { id } = req.params;
  const book = getBook(id);

  if (!book || !book.fileBook) {
    pageNotFound(res);
    return;
  }

  res.download(`${process.cwd()}/${book.fileBook}`);
});

module.exports = router;
