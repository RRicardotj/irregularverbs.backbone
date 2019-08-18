const { Schema, model } = require('../mongooseConnection');

const AdminUserSchema = new Schema({
  name: String,
  lastname: String,
  email: String,
  password: String,
});

module.exports = model('AdminUser', AdminUserSchema);
