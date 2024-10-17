'use strict';
const { faker } = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    let data=[];
    let amount=50;
    while(amount--){

      data.push({
        country:faker.address.country(),
        city:faker.address.city(),
        street:faker.address.streetName(), //faker.address.streetAddress(),
        numberOfStreet:faker.datatype.number({min:1,max:20}),
        createdAt: new Date(),
        updatedAt: new Date()
       
      })
    }
    return queryInterface.bulkInsert('Destinations', data,{});
    
  },

  async down (queryInterface, Sequelize) {
    
    return queryInterface.bulkDelete('Destinations', null, {});
  }
};
