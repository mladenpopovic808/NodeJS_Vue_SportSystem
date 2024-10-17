'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      //this.belongsTo(models.Club,{foreignKey:'clubId', as:'club', onDelete:'CASCADE', hooks:true, onUpdate:'CASCADE'})
      
      this.belongsTo(models.Club ,{foreignKey:'clubId', as:'club', onDelete:'CASCADE', hooks:true, onUpdate:'CASCADE'})
      this.hasMany(models.Match,{foreignKey:'playerOneId', as:'match1', onDelete:'CASCADE', hooks:true, onUpdate:'CASCADE'})
      this.hasMany(models.Match,{foreignKey:'playerTwoId', as:'match2', onDelete:'CASCADE', hooks:true, onUpdate:'CASCADE'})
      
      
    }
  }
  Player.init({
    name : {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true,
        len: [2, 20],
        is: /^[a-zA-Z\s]+$/i
    }
  },
    lastName : {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true,
        len: [2, 20],
        is: /^[a-zA-Z\s]+$/i
    }
  },
    years : {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true,
        len: [1, 3],
    }
  },
  
    tourPoints : {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true,
    }
  },
 
  }, {
    sequelize,
    defaultScope: {
      attributes: { exclude: ['matchId'] }
    },
    modelName: 'Player',
  });
  return Player;
};