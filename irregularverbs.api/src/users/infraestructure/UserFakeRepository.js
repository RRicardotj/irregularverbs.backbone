const randomstring = require('randomstring');

class UserFakeRepository {
  constructor(Entity) {
    this.users = [];
    this.Entity = Entity;
  }

  async create(user) {
    const newUser = new this.Entity(user);
    console.log('Creating user in a fake repository');
    const id = randomstring.generate(9);

    newUser.setId(id);

    this.users.push(newUser);
    // newUser.removePassword();
    return newUser;
  }

  async getUsers() {
    console.log('geting users in a fake repository');
    return this.users;
  }

  async getByPk(id) {
    const result = this.users.find((item) => item.id === id);

    const user = new this.Entity(result);

    // user.removePassword();

    return user;
  }
}

module.exports = UserFakeRepository;
