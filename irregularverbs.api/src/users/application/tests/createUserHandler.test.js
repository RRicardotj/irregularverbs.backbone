const createUserHandler = require('../createUserHandler');
const UserFakeRepository = require('../../infraestructure/UserFakeRepository');

const encrypter = require('../../infraestructure/encrypter');
const userValidator = require('../../infraestructure/validators/userValidator');
const ValidationError = require('../../../shared/infraestructure/ValidationError');

const userRepository = new UserFakeRepository();

describe('Create User Handler test', () => {
  describe('Throw a Validation error', () => {
    test('Throw a Validation error > without password', async () => {
      try {
        const params = {
          name: 'Name',
          lastname: 'Lastname',
          email: 'email@email.com',
        };
        await createUserHandler({ params, userRepository, encrypter, userValidator });
      } catch (e) {
        // console.log(e.fields);
        expect(e.name).toBe(ValidationError.name);
        expect(e.fields.password).toBeDefined();
      }
    });

    test('Throw a Validation error > password !== passwordConfirmation', async () => {
      try {
        const params = {
          name: 'Name',
          lastname: 'Lastname',
          email: 'email@email.com',
          password: '123456',
          passwordConfirmation: '1234567',
        };
        await createUserHandler({ params, userRepository, encrypter, userValidator });
      } catch (e) {
        // console.log(e.fields);
        expect(e.name).toBe(ValidationError.name);
        expect(e.fields.password).toBeDefined();
      }
    });

    test('Throw a Validation error > without params', async () => {
      try {
        const params = {};
        await createUserHandler({ params, userRepository, encrypter, userValidator });
      } catch (e) {
        // console.log(e.fields);
        expect(e.name).toBe(ValidationError.name);
        expect(e.fields.password).toBeDefined();
        expect(e.fields.name).toBeDefined();
        expect(e.fields.lastname).toBeDefined();
        expect(e.fields.email).toBeDefined();
      }
    });
  });

  test('Create user sucessfully', async () => {
    const params = {
      name: 'Name',
      lastname: 'Lastname',
      email: 'email@email.com',
      password: '123456',
      passwordConfirmation: '123456',
    };
    const user = await createUserHandler({ params, userRepository, encrypter, userValidator });

    const isDefinedAndQualTo = (expected, toBe) => {
      expect(expected).toBeDefined();
      expect(expected).toBe(toBe);
    };

    isDefinedAndQualTo(user.name, params.name);
    isDefinedAndQualTo(user.lastname, params.lastname);
    isDefinedAndQualTo(user.email, params.email);
    expect(user.id).toBeDefined();
    expect(user.password).toBeUndefined();
  });
});
