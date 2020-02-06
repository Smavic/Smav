'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model{}
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image_profile: DataTypes.STRING
  },{sequelize})
  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};