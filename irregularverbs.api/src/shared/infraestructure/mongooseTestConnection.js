const mongoose = require('mongoose');

const database = process.env.MONGO_DB_TEST
  ? `${process.env.MONGO_DB_TEST}/irregularverbsdb`
  : `${process.env.MONGO_DB}/irregularverbsdbTEST`;

mongoose.connect(database, { useNewUrlParser: true });

module.exports = mongoose;
