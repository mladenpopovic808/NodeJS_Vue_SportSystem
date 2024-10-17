'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      playerOneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull:true,
          notEmpty: true,
          isInt: true,
          min: 1
        }
      },
      playerTwoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull:true,
          notEmpty: true,
          isInt: true,
          min: 1
        }
      },
      tournamentId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull:true,
          notEmpty: true,
          isInt: true,
          min: 1
        }
      },
      
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Matches');
  }
};