const express = require("express");
const pageNotFound = require("../helpers/pageNotFound.js");
const { store } = require("../libraryStoreClass.js");
const { addBook, deleteBook, editBook, getBooks, getBook } = store;

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

router.post("/", (req, res) => {
  const book = addBook(req.body);

  res.status(201);
  res.json(book);
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const book = editBook({ ...req.body, id });

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

module.exports = router;
