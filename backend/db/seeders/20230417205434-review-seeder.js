"use strict";

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    await queryInterface.bulkInsert(options,[
      {
        spotId: 1,
        userId: 4,
        review: 'A wild experience!',
        stars: 3,
        },
        {
        spotId: 2,
        userId: 4,
        review: 'Saucy like a Charizard!',
        stars: 4,
        },
        {
        spotId: 3,
        userId: 4,
        review: 'Absolutely swaggy Pikachu!',
        stars: 5,
        },
        {
        spotId: 4,
        userId: 4,
        review: 'Could use more Eevee-evolutions',
        stars: 2,
        }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    await queryInterface.bulkDelete(options)
  }
};
