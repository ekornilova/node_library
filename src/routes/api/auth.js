const express = require("express");
const router = express.Router();

router.post("/login", (_, res) => {
  res.status(201);
  res.json({ id: 1, mail: "testt@mail.ru" });
});

module.exports = router;
