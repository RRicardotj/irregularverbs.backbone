const bcrypt = require('bcrypt');

module.exports = {
  encrypt: (value) => bcrypt.hashSync(value, 10),
  compare: (value) => bcrypt.compareSync(value),
};
