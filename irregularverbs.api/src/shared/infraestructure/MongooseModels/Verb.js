/**
 * @param {import('mongoose')} connection
 * @returns {import('mongoose').model}
 */
module.exports = (connection) => {
  const { Schema, model } = connection;
  const VerbSchema = new Schema({
    spanish: String,
    infinitive: String,
    preterit: String,
    pastParticipe: String,
  });

  return model('Verb', VerbSchema);
};
