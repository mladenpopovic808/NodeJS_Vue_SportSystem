'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AboutUs extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  
  AboutUs.init({
    text :{
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true,
        
      }
    },
  }, {
    sequelize,
    modelName: 'AboutUs',
  });
  return AboutUs;
};