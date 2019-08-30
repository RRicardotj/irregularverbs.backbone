const connection = require('../../../shared/infraestructure/mongooseTestConnection');
const UserMongoDbRepository = require('../UserMongoDbRepository');

const repository = new UserMongoDbRepository(connection);
const { User } = require('../../domain/Entities');

const userTest = (expected, user, { withId } = {}) => {
  expect(expected).toBeDefined();
  expect(expected.email).toBe(user.email);
  expect(expected.name).toBe(user.name);
  expect(expected.lastname).toBe(user.lastname);
  expect(expected.password).toBe(user.password);
  expect(expected.id).toBeDefined();

  if (withId) {
    expect(expected.id).toBe(user.id);
  }
};

describe('Testing UserMongoDbRepository > create', () => {
  test('creating user', async () => {
    const user = new User({
      email: 'test@test.com',
      name: 'test name',
      lastname: 'test lastname',
      password: '1234test',
    });

    const userCreated = await repository.create(user);

    userTest(userCreated, user);

    await repository.deleteById(userCreated.id);
  });
});

describe('Testing UserMongoDbRepository > getting users', () => {
  const usersCreated = [];

  beforeAll(async () => {
    await repository.deleteAll();
    console.log('Creating based data');

    const user1 = await repository.create(
      new User({
        name: 'name user1',
        lastname: 'lastname user1',
        email: 'email user1',
        password: 'password user1',
      }),
    );
    usersCreated.push(user1);

    const user2 = await repository.create(
      new User({
        name: 'name user2',
        lastname: 'lastname user2',
        email: 'email user2',
        password: 'password user2',
      }),
    );
    usersCreated.push(user2);

    const user3 = await repository.create(
      new User({
        name: 'name user3',
        lastname: 'lastname user3',
        email: 'email user3',
        password: 'password user3',
      }),
    );
    usersCreated.push(user3);
  });

  test('get all users', async () => {
    const users = await repository.getUsers();

    expect(users).toHaveLength(usersCreated.length);

    for (let i = 0; i < users.length; i += 1) {
      const user = users[i];
      const userSaved = usersCreated[i];

      userTest(userSaved, user, { withId: true });
    }
  });

  test('getting a user by id', async () => {
    const userToFound = usersCreated[0];

    const userFound = await repository.getByPk(userToFound.id);

    userTest(userToFound, userFound, { withId: true });
  });

  test('getting a user by field > email', async () => {
    const userToFound = usersCreated[0];

    const userFound = await repository.getByField('email', userToFound.email);

    userTest(userToFound, userFound, { withId: true });
  });

  test('getting a user by field > name', async () => {
    const userToFound = usersCreated[1];

    const userFound = await repository.getByField('name', userToFound.name);

    userTest(userToFound, userFound, { withId: true });
  });

  test('getting a user by field > lastname', async () => {
    const userToFound = usersCreated[2];

    const userFound = await repository.getByField('lastname', userToFound.lastname);

    userTest(userToFound, userFound, { withId: true });
  });

  afterAll(async () => {
    await repository.deleteAll();
    await connection.connection.close();
  });
});
