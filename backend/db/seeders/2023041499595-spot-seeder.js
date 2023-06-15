'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up (queryInterface, Sequelize) {
  options.tableName = 'Spots';
   return queryInterface.bulkInsert(options,[
    {
      ownerId: 1,
      address: 'Pallet Town',
      city: 'Pallet',
      state: 'Kanto',
      country: 'Kanto Region',
      lat: 35.05,
      lng: 135.78,
      name: "Professor Oak's Lab",
      description: "Located in the peaceful town of Pallet, Professor Oak's Lab is a renowned research facility where trainers start their Pokemon journey.",
      price: 100.00
      },
      {
      ownerId: 1,
      address: '123 Victory Road',
      city: 'Indigo Plateau',
      state: 'Kanto',
      country: 'Kanto Region',
      lat: 35.6,
      lng: 139.6,
      name: 'Elite Four HQ',
      description: "'Situated at the majestic Indigo Plateau, the Elite Four HQ is a challenging destination where only the strongest trainers can test their skills against the Kanto region's elite trainers.",
      price: 500.00
      },
      {
      ownerId: 1,
      address: '456 Ecruteak City',
      city: 'Ecruteak',
      state: 'Johto',
      country: 'Johto Region',
      lat: 36.41,
      lng: 138.25,
      name: 'Burned Tower View',
      description: 'Experience luxury and breathtaking views of the historic Burned Tower in the scenic city of Ecruteak. Immerse yourself in the rich culture and traditions of the Johto region.',
      price: 1000.00
      },
      {
      ownerId: 1,
      address: '789 Sootopolis City',
      city: 'Sootopolis',
      state: 'Hoenn',
      country: 'Hoenn Region',
      lat: 33.93,
      lng: 131.97,
      name: 'Cave of Origin Retreat',
      description: 'Escape to the tranquil Sootopolis City and indulge in a spacious villa with direct access to the mystical Cave of Origin. Discover the wonders of the Hoenn region and its captivating Pokemon.',
      price: 2000.00
      }
   ],{})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options,null)
  }
};
