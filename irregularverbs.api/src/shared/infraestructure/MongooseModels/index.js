module.exports = (mongooseConnection) => {
  return {
    AdminUserModel: require('./AdminUser')(mongooseConnection),
    UserModel: require('./User')(mongooseConnection),
    VerbModel: require('./Verb')(mongooseConnection),
    GameModel: require('./Game')(mongooseConnection),
    RecordModel: require('./Record')(mongooseConnection),
  };
};
