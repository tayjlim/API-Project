'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'SpotImages'
    return queryInterface.bulkInsert(options,[
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/5d4d91e3-64ba-4480-b842-f3dacae7ed21.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/b7c661f3-1b24-4725-808b-ec3d9031a078.jpg?im_w=480',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/62b1d46f-3630-49aa-8888-4ffcdf592a03.jpg?im_w=480',
        preview: true
      },
      {
        spotId: 4,
        url: "https://a0.muscache.com/im/pictures/06fb8c2c-30de-41c4-b882-a703007e02e3.jpg?im_w=960",
        preview: true
      },
      {
        spotId: 5,
        url:"https://a0.muscache.com/im/pictures/f3fb2bbd-844c-4e24-ad30-41ed557ae570.jpg?im_w=480",
        preview: true
      },
      {
        spotId:6,
        url: 'https://a0.muscache.com/im/pictures/d2b95cc9-dbed-45f8-9349-c6da0d6633b2.jpg?im_w=480',
        preview: true
      }

    ])

  },

  async down (queryInterface, Sequelize) {
    options.TableName = 'SpotImages'
    await queryInterface.bulkDelete(options)
  }
};
