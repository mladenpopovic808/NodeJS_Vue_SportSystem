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
        lastName:faker.name.lastName(),
        years:faker.datatype.number({min:20,max:40}),
        tourPoints:faker.datatype.number({min:50,max:2000}),
        clubId:faker.datatype.number({min:1,max:50}),
        createdAt: new Date(),
        updatedAt: new Date()

      })
    }
    return queryInterface.bulkInsert('Players', data,{});  

    
  },

  async down (queryInterface, Sequelize) {
      
      return queryInterface.bulkDelete('Players', null, {});
  }
};
