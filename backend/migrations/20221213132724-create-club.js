'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Clubs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      destinationId:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      
      name:{
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
         
          notEmpty: true,
          len: [2, 20],
          is: /^[a-zA-Z\s]+$/i
      }
    },
      numberOfCourts: {
        type: DataTypes.INTEGER,
        allowNull: true,
        validate: {
          
          notEmpty: true,
          len: [1, 20],
      }
    },
      creationDate: {
        type: DataTypes.DATE,
        allowNull: true,
        validate: {
          notNull:true,
          isDate:true,
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
    await queryInterface.dropTable('Clubs');
  }
};