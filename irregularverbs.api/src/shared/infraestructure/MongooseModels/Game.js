/**
 * @param {import('mongoose')} connection
 * @returns {import('mongoose').model}
 */
module.exports = (connection) => {
  const { Schema, model } = connection;
  const CurrentGameSchema = new Schema(
    {
      show: {
        spanish: String,
        infinitive: String,
        preterit: String,
        pastParticipe: String,
      },
      toComplete: [String],
      mistakes: Number,
    },
    { _id: false },
  );

  const GameSchema = new Schema({
    startedAt: Date,
    userId: Number,
    points: Number,
    skipsCount: Number,
    skipCount: Number,
    generalMistakes: Number,
    skipVerbs: [Number],
    completeVerbs: [Number],
    currentGame: CurrentGameSchema,
  });

  return model('Game', GameSchema);
};
