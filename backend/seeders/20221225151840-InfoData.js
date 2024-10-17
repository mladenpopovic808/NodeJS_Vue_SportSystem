'use strict';
const { faker } = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    let data=[]
    data.push({
      phoneNumber:faker.phone.number(),
      fax:faker.phone.number(),
      email:faker.internet.email(),
      street:faker.address.street(),
      numberOfStreet:faker.datatype.number({min:1,max:20}),
      createdAt: new Date(),
      updatedAt: new Date()
    })
    return queryInterface.bulkInsert('Infos', data,{});

    
  },

  async down (queryInterface, Sequelize) {
   
    return queryInterface.bulkDelete('Infos', null, {});

  }
};
