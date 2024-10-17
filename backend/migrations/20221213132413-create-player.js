'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Players', {
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
          len: [2, 20],
          is: /^[a-zA-Z\s]+$/i
      }
    },
    clubId:{
      type: DataTypes.INTEGER,
      allowNull: false,
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
    await queryInterface.dropTable('Players');
  }
};