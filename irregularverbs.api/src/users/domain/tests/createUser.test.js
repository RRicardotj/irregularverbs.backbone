const { createUserBuilder } = require('../');
const { User } = require('../Entities');
const UserFakeRepository = require('../../infraestructure/UserFakeRepository');
const encrypter = require('../../infraestructure/encrypter');

test('Create user Domain test', async () => {
  const userRepository = new UserFakeRepository(User);
  const createUser = createUserBuilder({ userRepository, encrypter });

  const data = {
    email: 'test@test.com',
    name: 'test',
    lastname: 'tested',
    password: '12344',
  };

  const user = await createUser(data);

  expect(user.email).toBe(data.email);
  expect(user.name).toBe(data.name);
  expect(user.lastname).toBe(data.lastname);
  expect(user.id).toBeDefined();

  expect(user.password).toBeUndefined();
});
