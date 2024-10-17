'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Infos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      phoneNumber : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull:true,
          notEmpty: true,
          len: [3, 20],
          
      }
    },
      fax : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull:true,
          notEmpty: true,
          len: [3, 20],
        }
      },
      email : {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull:true,
          notEmpty: true,
          len: [3, 20],
          isEmail: true
        }
      },
      street: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull:true,
          notEmpty: true,
          len: [3, 20],
        }
      },
      numberOfStreet: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull:true,
          notEmpty: true,
          len: [1, 20],
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
    await queryInterface.dropTable('Infos');
  }
};