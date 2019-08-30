const UserDomainError = require('./UserDomainError');
const { User } = require('./Entities');

module.exports = ({ userRepository, encrypter }) => async (
  { name, lastname, email, password },
  { hidePassword } = { hidePassword: true },
) => {
  try {
    if (!userRepository) {
      throw new UserDomainError(UserDomainError.MESSAGES_ERRORS.REPO_NOT_FOUND);
    }

    if (!encrypter) {
      throw new UserDomainError(UserDomainError.MESSAGES_ERRORS.ENCRYPTER_NOT_FOUND);
    }

    const passwordEncrypted = encrypter.encrypt(password);

    const user = new User({ name, lastname, email, password: passwordEncrypted });

    const result = await userRepository.create(user);

    if (hidePassword) {
      result.removePassword();
    }

    return result;
  } catch (error) {
    throw error;
  }
};
