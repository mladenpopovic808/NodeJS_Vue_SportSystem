'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Destination extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      this.hasOne(models.Club ,{foreignKey:'destinationId', as:'club', onDelete:'CASCADE', hooks:true, onUpdate:'CASCADE'})
    }
  }
  
  Destination.init({

    country: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true,
        len: [3, 20],
        is: /^[a-zA-Z\s]+$/i
    }
  },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true,
        len: [1, 20],
        is: /^[a-zA-Z\s]+$/i
    }
  },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true,
        len: [1, 20],
        is: /^[a-zA-Z\s]+$/i
    }
  },
    numberOfStreet: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true, 
    }
  },

  }, {
    sequelize,
   
    modelName: 'Destination',
  });
  return Destination;
};