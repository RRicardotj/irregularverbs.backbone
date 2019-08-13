const UserDomainError = require('./UserDomainError');

module.exports = ({ userRepository, encrypter }) => async ({ name, lastname, email, password }) => {
  try {
    if (!userRepository) {
      throw new UserDomainError(UserDomainError.MESSAGES_ERRORS.REPO_NOT_FOUND);
    }

    if (!encrypter) {
      throw new UserDomainError(UserDomainError.MESSAGES_ERRORS.ENCRYPTER_NOT_FOUND);
    }

    const passwordEncrypted = encrypter.encrypt(password);

    const result = await userRepository.create({ name, lastname, email, passwordEncrypted });

    return result;
  } catch (error) {
    throw error;
  }
};
