'use strict';
const { faker } = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
  
    let data=[];
    let amount=50;

    while(amount--){
      data.push({
        name:faker.name.firstName(),
        clubId:faker.datatype.number({min:1,max:50}),
        prizeMoney:faker.datatype.number({min:1000,max:100000}),
        points:faker.datatype.number({min:1,max:3000}),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    return queryInterface.bulkInsert('Tournaments', data,{});
  },

  async down (queryInterface, Sequelize) {
   
    return queryInterface.bulkDelete('Tournaments', null, {});
  }
};
