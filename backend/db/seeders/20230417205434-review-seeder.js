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
        userId: 1,
        review: 'Ghetto',
        stars: 3,
      }
      // {
      //   spotId: 2,
      //   userId: 1,
      //   review: 'sauce it up bluhd',
      //   stars: 4,
      // },
      // {
      //   spotId: 3,
      //   userId: 2,
      //   review: 'swaggg',
      //   stars: 5,
      // },
      // {
      //   spotId: 4,
      //   userId: 3,
      //   review: 'weoweo',
      //   stars: 2,
      // }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    await queryInterface.bulkDelete(options)
  }
};
