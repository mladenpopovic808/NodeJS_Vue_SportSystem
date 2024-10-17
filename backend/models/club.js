'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Club extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //this.hasMany(models.Player,{foreignKey:'clubId', as:'users', onDelete:'CASCADE', hooks:true, onUpdate:'CASCADE'})
      this.hasOne(models.Staff,{foreignKey:'clubId', as:'staff', onDelete:'CASCADE', hooks:true, onUpdate:'CASCADE'})
      this.hasMany(models.Tournament,{foreignKey:'clubId', as:'tournament', onDelete:'CASCADE', hooks:true, onUpdate:'CASCADE'})
      this.belongsTo(models.Destination,{foreignKey:'destinationId', as:'destination', onDelete:'CASCADE', hooks:true, onUpdate:'CASCADE'})
    }
  }
  
  Club.init({

    name:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
       
        notEmpty: true,
        len: [2, 20],
        is: /^[a-zA-Z\s]+$/i
    }
  },
    numberOfCourts: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        
        notEmpty: true,
        len: [1, 20],
        
    }
  },
    creationDate: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        
        isDate:true,
        notEmpty: true,
    }
  },

  }, {
    sequelize,
    modelName: 'Club',
  });
  return Club;
};