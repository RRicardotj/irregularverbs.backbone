/**
 * @param {import('mongoose')} connection
 * @returns {import('mongoose').model}
 */
module.exports = (connection) => {
  const { Schema, model } = connection;
  const AdminUserSchema = new Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
  });

  return model('AdminUser', AdminUserSchema);
};
