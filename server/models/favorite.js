'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Favorite extends Model{}
  Favorite.init({
    title: DataTypes.STRING,
    summary: DataTypes.STRING,
    year: DataTypes.STRING,
    genres: DataTypes.STRING,
    link: DataTypes.STRING,
    userId: DataTypes.INTEGER
  },{sequelize})
  Favorite.associate = function(models) {
    // associations can be defined here
  };
  return Favorite;
};