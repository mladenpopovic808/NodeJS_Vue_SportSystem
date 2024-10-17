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
        years:faker.datatype.number({min:1,max:80}),
        email:faker.internet.email(),
        clubId:faker.datatype.number({min:1,max:50}),
        createdAt: new Date(),
        updatedAt: new Date(),
      })
    }
    return queryInterface.bulkInsert('Staffs', data,{});
  },

  async down (queryInterface, Sequelize) {
    
    return queryInterface.bulkDelete('Staffs', null, {});
  }
};
