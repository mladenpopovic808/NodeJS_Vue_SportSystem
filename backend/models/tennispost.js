'use strict';
const { allow } = require('joi');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TennisPost extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {foreignKey: 'userId', as: 'user'});
    }
  }
  TennisPost.init({
    text:{
      type: DataTypes.STRING,
      allowNull: false,
    },

    title:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'TennisPost',
  });
  return TennisPost;
};