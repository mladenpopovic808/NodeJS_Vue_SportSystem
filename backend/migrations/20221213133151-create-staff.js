'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Staffs', {
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
    await queryInterface.dropTable('Staffs');
  }
};