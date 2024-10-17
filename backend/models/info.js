'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Info extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Info.init({
    phoneNumber : {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true,
        len: [3, 20],
        
    }
  },
    fax : {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true,
        len: [3, 20],
      }
    },
    email : {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true,
        len: [3, 20],
        isEmail: true
      }
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true,
        len: [3, 20],
      }
    },
    numberOfStreet: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true,
        len: [1, 20],
      }
    },
    
  
  }, {
    sequelize,
    modelName: 'Info',
  });
  return Info;
};