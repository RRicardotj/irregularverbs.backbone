/**
 * @param {import('mongoose')} connection
 * @returns {import('mongoose').model}
 */
module.exports = (connection) => {
  const { Schema, model } = connection;
  const RecordSchema = new Schema({
    points: Number,
    gameId: Number,
    startedAt: Date,
    finishedAt: Date,
  });

  return model('Record', RecordSchema);
};
