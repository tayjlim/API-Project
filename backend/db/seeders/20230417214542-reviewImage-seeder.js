'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
options.tableName = 'ReviewImages';
return queryInterface.bulkInsert(options,[
  {
    reviewId: 1,
    url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53218977/original/d56d5868-07c0-441e-b491-ba660ad36cc8.jpeg?im_w=720'
  },
  {
    reviewId: 2,
    url: 'https://a0.muscache.com/im/pictures/4a74e955-5065-4da7-9fc5-4a41946ebbc7.jpg?im_w=720'
  },
  {
    reviewId: 3,
    url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-28129017/original/49d99f6e-d5a7-40e9-9f50-1152bd3b28d9.jpeg?im_w=720'
  }
])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'ReviewImages';
    await queryInterface.bulkDelete(options);
  }
};
