'use strict';
const { faker } = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    
    let data=[];
    let amount=50;

    while(amount--){
      data.push({
        destinationId:faker.datatype.number({min:1,max:50}),
        name:faker.company.name(),
        numberOfCourts:faker.datatype.number({min:1,max:20}),
        creationDate:faker.date.past(),
        createdAt: new Date(),
        updatedAt: new Date()

      
      })
    }
    return queryInterface.bulkInsert('Clubs', data,{});
  },

  async down (queryInterface, Sequelize) {
   
    return queryInterface.bulkDelete('Clubs', null, {});
  }
};
