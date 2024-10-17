'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Tournaments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
    clubId:{
      type: DataTypes.INTEGER,
      allowNull: false,
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
    await queryInterface.dropTable('Tournaments');
  }
};