class UserDomainError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

UserDomainError.MESSAGES_ERRORS = {
  REPO_NOT_FOUND: 'User repository is need it',
  ENCRYPTER_NOT_FOUND: 'A encrypter is need it',
};

module.exports = UserDomainError;
