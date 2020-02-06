'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Favorite extends Model{}
  Favorite.init({
    link: DataTypes.STRING,
    userId: DataTypes.INTEGER
  },{sequelize})
  Favorite.associate = function(models) {
    // associations can be defined here
  };
  return Favorite;
};