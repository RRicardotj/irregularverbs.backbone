const randomstring = require('randomstring');
const { User } = require('../domain/Entities');

class UserFakeRepository {
  constructor() {
    this.users = [];
  }

  async create(user) {
    const newUser = new User(user);
    const id = randomstring.generate(9);

    newUser.setId(id);

    this.users.push(newUser);
    // newUser.removePassword();
    return newUser;
  }

  async getUsers() {
    return this.users;
  }

  async getByPk(id) {
    const result = this.users.find((item) => item.id === id);

    const user = new User(result);

    return user;
  }
}

module.exports = UserFakeRepository;
