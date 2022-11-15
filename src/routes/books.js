const express = require("express");
const Book = require("../models/book");

const router = express.Router();
const showError = (res, e) => {
  res.render("errors/500", {
    title: "Ошибка!!",
    message: e,
  });
};

router.get("/", async (_, res) => {
  try {
    const bookList = await Book.find().select("-__v");
    res.render("books/index", {
      title: "Books",
      books: bookList,
    });
  } catch (e) {
    showError(res, e);
  }
});

router.get("/create", (req, res) => {
  res.render("books/create", {
    title: "Book | create",
    book: {},
  });
});

router.post("/create", async (req, res) => {
  const { title, description } = req.body;
  const newBook = new Book({
    title,
    description,
  });
  try {
    await newBook.save();

    res.redirect(`/books`);
  } catch (e) {
    showError(res, e);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id).select("-__v");

    if (!book) {
      res.redirect("/404");
      return;
    }
    res.render("books/view", {
      title: "Book | view",
      book,
    });
  } catch (e) {
    showError(res, e);
  }
});

router.get("/update/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findById(id).select("-__v");

    if (!book) {
      res.redirect("/404");
      return;
    }
    res.render("books/update", {
      title: "Book | update",
      book,
    });
  } catch (e) {
    showError(res, e);
  }
});

router.post("/update/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  try {
    await Book.findByIdAndUpdate(id, {
      title,
      description,
    });
    res.redirect(`/books`);
  } catch (e) {
    showError(res, e);
  }
});

router.post("/delete/:id", async (req, res) => {
  const { id: _id } = req.params;

  try {
    await Book.deleteOne({
      _id,
    });
    res.redirect(`/books`);
  } catch (e) {
    showError(res, e);
  }
});

module.exports = router;
