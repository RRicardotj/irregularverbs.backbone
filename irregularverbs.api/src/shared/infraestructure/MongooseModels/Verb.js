const { Schema, model } = require('../mongooseConnection');

const VerbSchema = new Schema({
  spanish: String,
  infinitive: String,
  preterit: String,
  pastParticipe: String,
});

module.exports = model('Verb', VerbSchema);
