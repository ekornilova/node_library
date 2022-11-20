const { store } = require("./userStoreClass");

exports.findById = function (id, cb) {
  process.nextTick(function () {
    const user = store.findUserById(id);
    if (user) {
      cb(null, user);
    } else {
      cb(new Error("User " + id + " does not exist"));
    }
  });
};

exports.findByUsername = function (username, cb) {
  process.nextTick(function () {
    const user = store.findUserByUserName(username);
    if (user) {
      return cb(null, user);
    }
    return cb(null, null);
  });
};

exports.signup = function (req, cb) {
  process.nextTick(function () {
    const user = store.signUp(req.body);
    return cb(null, user);
  });
};

exports.verifyPassword = (user, password) => {
  return user.password === password;
};
