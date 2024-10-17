'use strict';
const { faker } = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    
    let amount=50;
    let data=[];

    while(amount--){
      data.push({
        matchId:faker.datatype.number({min:1,max:50}),
        firstSetGemsLooser:faker.datatype.number({min:0,max:4}),
        firstSetGemsWinner:faker.datatype.number({min:6,max:6}),
        secondSetGemsLooser:faker.datatype.number({min:0,max:4}),
        secondSetGemsWinner:faker.datatype.number({min:6,max:6}),
        thirdSetGemsLooser:faker.datatype.number({min:0,max:4}),
        thirdSetGemsWinner:faker.datatype.number({min:6,max:6}),
        createdAt: new Date(),
        updatedAt: new Date()
        
      });
    }
    await queryInterface.bulkInsert('Results', data, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Results', null, {});
  }
};
