const { getUserByEmailBuilder, createUserBuilder } = require('../');
const UserFakeRepository = require('../../infraestructure/UserFakeRepository');
const encrypter = require('../../infraestructure/encrypter');

const userRepository = new UserFakeRepository();

const userTest = (expected, user, { hasPassword, passwordHidden } = {}) => {
  expect(expected).toBeDefined();
  expect(expected.email).toBe(user.email);
  expect(expected.name).toBe(user.name);
  expect(expected.lastname).toBe(user.lastname);
  expect(expected.id).toBeDefined();
  expect(expected.id).toBe(user.id);

  if (hasPassword) {
    expect(expected.password).toBeDefined();
    expect(encrypter.compare(user.password, expected.password)).toBeTruthy();
  }

  if (passwordHidden) {
    expect(expected.password).toBeUndefined();
  }
};

describe('Get user by email domain test', () => {
  const userDatas = [
    {
      email: 'test@test.com',
      name: 'test',
      lastname: 'tested',
      password: '12344',
    },
    {
      email: 'test1@test.com',
      name: 'test1',
      lastname: 'tested1',
      password: '123444',
    },
  ];

  beforeAll(async () => {
    for (const userData of userDatas) {
      const createUser = createUserBuilder({ userRepository, encrypter });

      const user = await createUser(userData, { hidePassword: false });
      userData.id = user.id;
    }
  });

  test('Get by email with password', async () => {
    const userToFound = userDatas[0];
    const getUserByEmail = getUserByEmailBuilder({ userRepository });

    const user = await getUserByEmail(userToFound.email);

    userTest(user, userToFound, { hasPassword: true });
  });

  test('Get by email without password', async () => {
    const userToFound = userDatas[1];
    const getUserByEmail = getUserByEmailBuilder({ userRepository });

    const user = await getUserByEmail(userToFound.email, { hidePassword: true });

    userTest(user, userToFound, { passwordHidden: true });
  });
});
