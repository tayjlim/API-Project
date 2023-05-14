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
      city: 'Kanto',
      state: 'Poke',
      country: 'Japan',
      lat: 35.05,
      lng: 135.78,
      name: 'Professor Oak\'s Lab',
      description: 'The research laboratory of the world-famous Pokémon expert, Professor Oak',
      price: 100.00
    },
    {
      ownerId: 1,
      address: '123 Victory Road',
      city: 'Indigo Plateau',
      state: 'Poke',
      country: 'Japan',
      lat: 35.6,
      lng: 139.6,
      name: 'Elite Four HQ',
      description: 'The headquarters of the Kanto Elite Four, where only the strongest trainers are allowed to challenge',
      price: 500.00
    },
    {
      ownerId: 1,
      address: '456 Ecruteak City',
      city: 'Johto',
      state: 'Poke',
      country: 'Japan',
      lat: 36.41,
      lng: 138.25,
      name: 'Burned Tower View',
      description: 'Luxury apartment with stunning views of the historic Burned Tower in Ecruteak City',
      price: 1000.00
    },
    {
      ownerId: 1,
      address: '789 Sootopolis City',
      city: 'Hoenn',
      state: 'Poke',
      country: 'Japan',
      lat: 33.93,
      lng: 131.97,
      name: 'Cave of Origin Retreat',
      description: 'A spacious villa with direct access to the Cave of Origin in Sootopolis City',
      price: 2000.00
    }
   ],{})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options,null)
  }
};
