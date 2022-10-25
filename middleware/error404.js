// const pageNotFound = require("../helpers/pageNotFound.js");

module.exports = (req, res, next) => {
  // pageNotFound(res);
  // next();

  res.render("errors/404", {
    title: "404",
  });
};
