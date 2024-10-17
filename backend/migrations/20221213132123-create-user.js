'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        
  
    },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
   
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
   
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    password :{
      type: DataTypes.STRING,
      allowNull: false,
      
  },
      moderator: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        
    },
      admin :{
        type: DataTypes.BOOLEAN,
        allowNull: false,
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
    await queryInterface.dropTable('Users');
  }
};