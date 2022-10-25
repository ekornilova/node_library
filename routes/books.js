const express = require("express");
const pageNotFound = require("../helpers/pageNotFound.js");
const { store } = require("../libraryStoreClass.js");
const { addBook, deleteBook, editBook, getBooks, getBook } = store;

const router = express.Router();

router.get("/", (_, res) => {
  res.render("books/index", {
    title: "Books",
    books: getBooks(),
  });
});

router.get("/create", (req, res) => {
  res.render("books/create", {
    title: "Book | create",
    book: {},
  });
});

router.post("/create", (req, res) => {
  const book = addBook(req.body);

  res.redirect(`/books`);
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = getBook(id);

  if (book) {
    res.render("books/view", {
      title: "Book | view",
      book,
    });
  } else {
    res.redirect("/404");
  }
});

router.get("/update/:id", (req, res) => {
  const { id } = req.params;
  const book = getBook(id);

  if (book) {
    res.render("books/update", {
      title: "Book | update",
      book,
    });
  } else {
    res.redirect("/404");
  }
});

router.post("/update/:id", (req, res) => {
  const { id } = req.params;
  const patchData = { ...req.body, id };
  const book = editBook(patchData);

  if (book) {
    res.redirect(`/books`);
  } else {
    res.redirect("/404");
  }
});

router.post("/delete/:id", (req, res) => {
  const { id } = req.params;
  const isDeleted = deleteBook(id);

  if (isDeleted) {
    res.redirect(`/books`);
  } else {
    res.redirect("/404");
  }
});

module.exports = router;
