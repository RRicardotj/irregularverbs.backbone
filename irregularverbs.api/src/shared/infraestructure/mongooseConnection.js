const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGO_DB}/irregularverbsdb`, { useNewUrlParser: true });

module.exports = mongoose;
