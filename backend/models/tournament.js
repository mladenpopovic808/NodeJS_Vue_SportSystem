'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tournament extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      
      this.belongsTo(models.Club,{foreignKey:'clubId', as:'club', onDelete:'CASCADE', hooks:true, onUpdate:'CASCADE'});
      this.hasMany(models.Match,{foreignKey:'tournamentId', as:'match', onDelete:'CASCADE', hooks:true, onUpdate:'CASCADE'});

    }
  }
  Tournament.init({
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
    prizeMoney: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true,
        
    }
  },
    points: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true,
        
    }
  },

  }, {
    sequelize,
    modelName: 'Tournament',
  });
  return Tournament;
};