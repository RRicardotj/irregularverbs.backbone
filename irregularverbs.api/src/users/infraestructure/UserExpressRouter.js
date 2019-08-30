const express = require('express');
const { withCatchExpressAsync } = require('../../shared/infraestructure');
const { createUserHandler } = require('../application');
const connection = require('../../shared/infraestructure/mongooseConnection');
const UserRepository = require('./UserMongoDbRepository');
const userValidator = require('./validators/userValidator');

const userRepository = new UserRepository(connection);
const encrypter = require('./encrypter');

const router = express.Router();

router.post(
  '/',
  withCatchExpressAsync(async (req, res) => {
    try {
      const params = {
        name: req.body.name,
        email: req.body.email,
        lastname: req.body.lastname,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm,
      };

      const response = await createUserHandler({
        params,
        userRepository,
        userValidator,
        encrypter,
      });

      return res.json(response);
    } catch (error) {
      throw error;
    }
  }),
);

module.exports = router;
