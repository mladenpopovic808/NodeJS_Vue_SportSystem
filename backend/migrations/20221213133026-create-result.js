'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Results', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstSetGemsLooser: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull:true,
          notEmpty: true,
      }
    },
    matchId:{
      type: DataTypes.INTEGER,
      allowNull: false,
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
    await queryInterface.dropTable('Results');
  }
};