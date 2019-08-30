const { createUserBuilder } = require('../domain');

const ValidationError = require('../../shared/infraestructure/ValidationError');

module.exports = async ({ params, userRepository, userValidator, encrypter }) => {
  try {
    const createUser = createUserBuilder({ userRepository, encrypter });

    const rules = {
      name: 'required',
      lastname: 'required',
      email: 'required',
      password: 'required|confirmed',
    };

    const isValid = await userValidator(params, rules);

    if (!isValid.result) {
      throw new ValidationError(ValidationError.ERROR_MESSAGES.FIELD_FAILS, isValid.fields);
    }

    const { name, lastname, email, password } = params;
    const response = await createUser({ name, lastname, email, password });

    return response;
  } catch (error) {
    throw error;
  }
};
