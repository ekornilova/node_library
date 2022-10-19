const express = require("express");
const booksRouter = require("./routes/books.js");
const authRouter = require("./routes/auth.js");
const logger = require("./middleware/logger.js");
const error404 = require("./middleware/error404");

const app = express();
app.use(express.json());
app.use(logger);
app.use("/api/books", booksRouter);
app.use("/api/user", authRouter);
app.use(error404);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
