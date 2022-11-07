const fs = require("fs");
const os = require("os");

module.exports = (req, res, next) => {
  fs.appendFile(
    "server.log",
    `${Date.now()} ${req.method} ${req.url}${os.EOL}`,
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
  next();
};
