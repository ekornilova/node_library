const express = require("express");
const session = require("express-session");
const userRouter = require("./routes/user.js");
const apiBooksRouter = require("./routes/api/books.js");
const apiAuthRouter = require("./routes/api/auth.js");
const booksRouter = require("./routes/books.js");
const logger = require("./middleware/logger.js");
const error404 = require("./middleware/error404");
const indexRouter = require("./routes/index");
const userPassport = require("./userPassport.js");

const app = express();
app.use(express.json());
app.use(express.urlencoded());

app.use(session({ secret: "SECRET" }));
app.use(userPassport.initialize());
app.use(userPassport.session());

app.use(logger);
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use("/", indexRouter);
app.use("/books", booksRouter);
app.use("/api/books", apiBooksRouter);
app.use("/api/user", apiAuthRouter);
app.use("/user", userRouter);
app.use(error404);

const PORT = process.env.PORT || 3000;
app.listen(PORT);
