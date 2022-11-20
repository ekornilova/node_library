const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {
  findById,
  findByUsername,
  verifyPassword,
  signup,
} = require("./store/user/userAction");

const verify = (req, username, password, done) => {
  findByUsername(username, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    if (!verifyPassword(user, password)) {
      return done(null, false);
    }

    return done(null, user);
  });
};

const signUpUser = (req, username, password, done) => {
  signup(req, (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    return done(null, user);
  });
};

const options = {
  usernameField: "username",
  passwordField: "password",
  passReqToCallback: true,
};

passport.use("local-signup", new LocalStrategy(options, signUpUser));

passport.use("local-login", new LocalStrategy(options, verify));

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

module.exports = passport;
