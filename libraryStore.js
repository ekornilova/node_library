const { Book } = require("./book.js");

const libraryStore = {
  books: [],
};

const addBook = ({
  title,
  description,
  authors,
  favorite,
  fileCover,
  fileName,
}) => {
  const book = new Book({
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
  });
  libraryStore.books.push(book);
  return book;
};

const deleteBook = (id) => {
  const idx = libraryStore.books.findIndex((book) => book.id === id);
  if (idx < 0) {
    return null;
  }
  const book = libraryStore.books[idx];
  libraryStore.books.splice(idx, 1);
  return book;
};

const editBook = ({
  title,
  description,
  authors,
  favorite,
  fileCover,
  fileName,
  id,
}) => {
  const idx = libraryStore.books.findIndex((book) => book.id === id);
  if (idx < 0) {
    return null;
  }
  libraryStore.books[idx] = {
    ...libraryStore.books[idx],
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    id,
  };
  return libraryStore.books[idx];
};

const getBooks = () => {
  return libraryStore.books;
};

const getBook = (id) => {
  return libraryStore.books.find((book) => book.id === id);
};

module.exports = {
  addBook,
  deleteBook,
  editBook,
  getBooks,
  getBook,
};
