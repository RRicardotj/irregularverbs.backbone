const UserDomainError = require('./UserDomainError');
const { User } = require('./Entities');

module.exports = ({ userRepository }) => async ({ name, lastname, email, password }) => {
  try {
    if (!userRepository) {
      throw new UserDomainError(UserDomainError.MESSAGES_ERRORS.REPO_NOT_FOUND);
    }


    const result = await userRepository.create(user);

    result.removePassword();

    return result;
  } catch (error) {
    throw error;
  }
};
