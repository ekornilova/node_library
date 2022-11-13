const express = require("express");
const axios = require("axios");
const pageNotFound = require("../../helpers/pageNotFound.js");
const { store } = require("../../libraryStoreClass.js");
const { addBook, deleteBook, editBook, getBooks, getBook } = store;
const fileMulter = require("../../middleware/file");

const router = express.Router();
const COUNTER_HOST = process.env.COUNTER_HOST || "localhost";
const COUNTER_PORT = process.env.COUNTER_PORT || "3000";

router.get("/", (_, res) => {
  res.json(getBooks());
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const book = getBook(id);

  if (book) {
    axios
      .get(`http://${COUNTER_HOST}:${COUNTER_PORT}/counter/${book.id}`)
      .then(({ data }) => {
        return res.json({
          ...book,
          count: data.count,
        });
      })
      .catch((err) => {
        return res.status(500).send({ message: err });
      });
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
  axios
    .post(`http://${COUNTER_HOST}:${COUNTER_PORT}/counter/${book.id}/incr`)
    .then(({ data }) => {
      return res.json({
        ...book,
        count: data.count,
      });
    })
    .catch((err) => {
      return res.status(500).send({ message: err });
    });
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
