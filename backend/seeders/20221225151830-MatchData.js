'use strict';
const { faker } = require('@faker-js/faker');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
    
    const data = [];
    for(let i=0; i<50; i++){
      data.push({
        playerOneId: faker.datatype.number({min:1, max:50}),
        playerTwoId: faker.datatype.number({min:1, max:50}),
        courtType: faker.helpers.arrayElement(['SLJAKA', 'BETON', 'TRAVA']),
        tournamentId: faker.datatype.number({min:1, max:50}),
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
    await queryInterface.bulkInsert('Matches', data, {});

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Matches', null, {});
  }
};
