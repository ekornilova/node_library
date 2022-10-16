const express = require("express");
const {
  addBook,
  deleteBook,
  editBook,
  getBooks,
  getBook,
} = require("./libraryStore.js");

const app = express();
app.use(express.json());

const pageNotFound = (res) => {
  res.status(404);
  res.json("404 | страница не найдена");
};

app.get("/api/books", (_, res) => {
  res.json(getBooks());
});

app.get("/api/books/:id", (req, res) => {
  const { id } = req.params;
  const book = getBook(id);

  if (book) {
    res.json(book);
  } else {
    pageNotFound(res);
  }
});

app.post("/api/books", (req, res) => {
  const book = addBook(req.body);

  res.status(201);
  res.json(book);
});

app.put("/api/books/:id", (req, res) => {
  const { id } = req.params;
  const book = editBook({ ...req.body, id });

  if (book) {
    res.json(book);
  } else {
    pageNotFound(res);
  }
});

app.delete("/api/books/:id", (req, res) => {
  const { id } = req.params;
  const isDeleted = deleteBook(id);

  if (isDeleted) {
    res.json("ok");
  } else {
    pageNotFound(res);
  }
});
app.post("/api/user/login", (_, res) => {
  res.status(201);
  res.json({ id: 1, mail: "test@mail.ru" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT);
