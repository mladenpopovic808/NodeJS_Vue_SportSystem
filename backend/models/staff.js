'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Staff extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Club,{foreignKey:'clubId', as:'club', onDelete:'CASCADE', hooks:true, onUpdate:'CASCADE'})
      
      
    }
  }
  Staff.init({
    name : {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true,
        len: [3, 20],
        is: /^[a-zA-z]+$/i
    }
  },
    lastName : {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true,
        len: [3, 20],
        is: /^[a-zA-z]+$/i
    }
  },
    years : {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true,
 
    }
  },
    email : {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true,
        isEmail: true,
        
    }
  },
 
  }, {
    sequelize,
   
    modelName: 'Staff',
  });
  return Staff;
};