'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  const bcryptPass = require('../helpers/bcrypt')
  class User extends Model{}
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image_profile: DataTypes.STRING
  },{hooks:{
    beforeSave: (user, options) => {
      user.password = bcryptPass.hashPassword(user.password)
    }
  },sequelize})
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};