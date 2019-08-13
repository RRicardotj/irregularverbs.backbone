const express = require('express');
const { withCatchExpressAsync } = require('../../shared/infraestructure');
const { createUserHandler } = require('../application');
const UserFakeRepository = require('./UserFakeRepository');
const userValidator = require('./validators/userFakeValidator');
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

      const userRepository = new UserFakeRepository();

      const response = await createUserHandler({
        params,
        userRepository,
        userValidator,
        encrypter,
      });

      return res.json(response);
    } catch (error) {
      console.log('Finalmente llegó aqui el error'); // eslint-disable-line
      throw error;
    }
  }),
);

module.exports = router;
