const express = require("express");
const router = express.Router();
const userPassport = require("../userPassport.js");

router.get("/", (req, res) => {
  res.render("user/home", { user: req.user, title: "Пользователь" });
});

router.get("/login", (req, res) => {
  res.render("user/login", { title: "Пользователь" });
});

router.post(
  "/login",
  userPassport.authenticate("local-login", {
    failureRedirect: "/404",
    successRedirect: "/",
  })
);

router.get("/signup", (req, res) => {
  res.render("user/signup", { title: "Пользователь" });
});

router.post(
  "/signup",
  userPassport.authenticate("local-signup", {
    failureRedirect: "/404",
    successRedirect: "/user/profile",
  })
);

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get(
  "/profile",
  (req, res, next) => {
    if (!req.isAuthenticated()) {
      return res.redirect("/user/login");
    }
    next();
  },
  (req, res) => {
    res.render("user/profile", { user: req.user, title: "Пользователь" });
  }
);

module.exports = router;
