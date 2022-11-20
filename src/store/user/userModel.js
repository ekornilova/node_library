const { v4: uuid } = require("uuid");

class User {
  constructor({
    username = "",
    password = "",
    displayName = "",
    email = "",
    id = uuid(),
  }) {
    this.username = username;
    this.password = password;
    this.displayName = displayName;
    this.email = email;
    this.id = id;
  }
}
module.exports = {
  User,
};
