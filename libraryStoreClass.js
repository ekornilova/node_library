const { Book } = require("./book.js");

class LibraryStore {
  constructor() {
    this.books = [];
  }
  addBook = ({
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
    this.books.push(book);
    return book;
  };

  deleteBook = (id) => {
    const idx = this.books.findIndex((book) => book.id === id);
    if (idx < 0) {
      return false;
    }
    this.books.splice(idx, 1);
    return true;
  };

  editBook = ({
    title,
    description,
    authors,
    favorite,
    fileCover,
    fileName,
    id,
  }) => {
    const idx = this.books.findIndex((book) => book.id === id);
    if (idx < 0) {
      return null;
    }
    this.books[idx] = {
      ...this.books[idx],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      id,
    };
    return this.books[idx];
  };

  getBooks = () => {
    return this.books;
  };

  getBook = (id) => {
    return this.books.find((book) => book.id === id);
  };
}

module.exports = {
  store: new LibraryStore(),
};
