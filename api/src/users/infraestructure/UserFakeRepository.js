const randomstring = require('randomstring');

class UserFakeRepository {
  async create (user) {
    console.log('Creating user in a fake repository');
    const id = randomstring.generate(9);

    user.id = id;

    delete user.passwordEncrypted;
    return user;
  }
}

module.exports = UserFakeRepository;
