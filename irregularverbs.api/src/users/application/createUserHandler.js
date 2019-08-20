const { createUserBuilder } = require('../domain');

const ValidationError = require('../../shared/infraestructure/ValidationError');

module.exports = async ({ params, userRepository, userValidator, encrypter }) => {
  try {
    // le va a pasar la implementacion del repositorio
    const createUser = createUserBuilder({ userRepository, encrypter });

    const isValid = await userValidator(params);

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
