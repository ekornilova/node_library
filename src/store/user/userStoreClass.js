const { User } = require("./userModel");

class UserStore {
  constructor() {
    this.users = [];
  }
  signUp = ({ username, password = "", displayName = "", email }) => {
    const user = new User({
      username,
      password,
      displayName,
      email,
    });
    this.users.push(user);
    return user;
  };

  findUserById = (id) => {
    return this.users.find((user) => user.id === id);
  };

  findUserByUserName = (username) => {
    return this.users.find((user) => user.username === username);
  };
}
module.exports = {
  store: new UserStore(),
};
