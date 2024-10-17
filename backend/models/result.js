'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Result extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Match,{foreignKey:'matchId', as:'match', onDelete:'CASCADE', hooks:true, onUpdate:'CASCADE'})
      
      
    }
  }
  Result.init({
    firstSetGemsLooser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true,
    }
  },
  firstSetGemsWinner: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notNull:true,
      notEmpty: true,
  }
},
    secondSetGemsLooser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true,
    }
    },

    secondSetGemsWinner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true,
    }
  },
    thirdSetGemsWinner: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true,
    }
},
    thirdSetGemsLooser: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true,
    }
  },
 
  }, {
    sequelize,
    modelName: 'Result',
  });
  return Result;
};