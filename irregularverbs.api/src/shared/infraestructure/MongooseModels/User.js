const { Schema, model } = require('../mongooseConnection');

const UserSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
});

module.exports = model('User', UserSchema);
