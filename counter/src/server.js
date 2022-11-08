const express = require("express");
const redis = require("redis");

const app = express();
const PORT = process.env.PORT || 3000;
const REDIS_URL = process.env.REDIS_URL || "redis://localhost";

const client = redis.createClient({ url: REDIS_URL });

(async () => {
  await client.connect();
})();

app.post("/counter/:bookId/incr", async (req, res) => {
  const { bookId } = req.params;
  const count = await client.incr(bookId);
  res.status(200);
  res.json({ bookId, count });
});

app.get("/counter/:bookId", async (req, res) => {
  const { bookId } = req.params;
  const count = await client.incr(bookId);
  res.status(200);
  res.json({ bookId, count });
});

app.listen(PORT, () => {
  console.log(`server listen ${PORT}`);
});
