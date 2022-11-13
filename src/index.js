const express = require("express");
const mongoose = require("mongoose");

const apiBooksRouter = require("./routes/api/books.js");
const apiAuthRouter = require("./routes/api/auth.js");
const booksRouter = require("./routes/books.js");
const logger = require("./middleware/logger.js");
const error404 = require("./middleware/error404");
const indexRouter = require("./routes/index");

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(logger);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use("/", indexRouter);
app.use("/books", booksRouter);
app.use("/api/books", apiBooksRouter);
app.use("/api/user", apiAuthRouter);
app.use(error404);

const startServer = async (port, mogooseUrl) => {
  try {
    console.log({ port, mogooseUrl });
    await mongoose.connect(mogooseUrl);
    app.listen(port);
  } catch (e) {
    console.log(e);
  }
};

const PORT = process.env.PORT || 3000;
const MOGOOSE_URL = process.env.MOGOOSE_URL || "";

startServer(PORT, MOGOOSE_URL);
