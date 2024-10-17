'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Match extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Player,{foreignKey:'playerOneId', as:'player1', onDelete:'CASCADE', hooks:true, onUpdate:'CASCADE'})
      this.belongsTo(models.Player,{foreignKey:'playerTwoId', as:'player2', onDelete:'CASCADE', hooks:true, onUpdate:'CASCADE'})

      this.hasOne(models.Result,{foreignKey:'matchId', as:'result', onDelete:'CASCADE', hooks:true, onUpdate:'CASCADE'})
      this.belongsTo(models.Tournament,{foreignKey:'tournamentId', as:'tournament', onDelete:'CASCADE', hooks:true, onUpdate:'CASCADE'});   
    }
  }
  
  Match.init({
    courtType: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:true,
        notEmpty: true,
        len: [3, 20],
        is: /^[a-zA-Z\s]+$/i,
        isIn: [['SLJAKA', 'BETON', 'TRAVA', 'sljaka','beton','trava']]
    }
  },
    
  }, {
    sequelize,
    defaultScope: {
      attributes: { exclude: ['resultId'] }
    },
    modelName: 'Match',
  });
  return Match;
};