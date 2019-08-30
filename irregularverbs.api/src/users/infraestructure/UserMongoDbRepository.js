const { User } = require('../domain/Entities');
const MongooseModels = require('../../shared/infraestructure/MongooseModels');

class UserMongoDbRepository {
  constructor(connection) {
    if (!connection) {
      throw new Error('Mongoose connection is need it');
    }

    const { UserModel } = MongooseModels(connection);
    this.UserModel = UserModel;
  }

  async create(user) {
    const newUser = new this.UserModel(user);

    await newUser.save();

    return new User(newUser);
  }

  async getUsers() {
    const users = await this.UserModel.find();

    return users.map((item) => new User(item));
  }

  async getByPk(id) {
    const user = await this.UserModel.findById(id);

    return new User(user);
  }

  async getByField(field, value) {
    const result = this.users.find((item) => item[field] === value);

    const user = new User(result);

    return user;
  }

  async deleteById(id) {
    await this.UserModel.deleteOne({ _id: id });
  }

  async deleteAll() {
    await this.UserModel.deleteMany();
  }
}

module.exports = UserMongoDbRepository;
