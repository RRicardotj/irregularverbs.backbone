const UserDomainError = require('./UserDomainError');

module.exports = ({ userRepository }) => async (email, { hidePassword } = {}) => {
  try {
    if (!userRepository) {
      throw new UserDomainError(UserDomainError.MESSAGES_ERRORS.REPO_NOT_FOUND);
    }

    const result = await userRepository.getByField('email', email);

    if (hidePassword) {
      result.removePassword();
    }

    return result;
  } catch (error) {
    throw error;
  }
};
