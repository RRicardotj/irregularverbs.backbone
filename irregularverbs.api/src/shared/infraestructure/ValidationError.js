class ValidationError extends Error {
  constructor(message, fields) {
    super(message);
    this.name = this.constructor.name;
    this.fields = fields;
  }
};

ValidationError.ERROR_MESSAGES = {
  FIELD_FAILS: 'Fields validation fails',
};

module.exports = ValidationError;
