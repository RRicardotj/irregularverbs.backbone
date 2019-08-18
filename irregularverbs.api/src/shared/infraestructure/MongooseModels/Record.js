const { Schema, model } = require('../mongooseConnection');

const RecordSchema = new Schema({
  points: Number,
  gameId: Number,
  startedAt: Date,
  finishedAt: Date,
});

module.exports = model('Record', RecordSchema);
