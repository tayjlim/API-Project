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
      state: 'Kanto',
      country: 'Japan',
      lat: 35.05,
      lng: 135.78,
      name: 'Professor Oak\'s Lab',
      description: 'The research laboratory of the world-famous Pokémon expert, Professor Oak',
      price: 100.00
    },
    {
      ownerId: 2,
      address: '123 Victory Road',
      city: 'Indigo Plateau',
      state: 'Kanto',
      country: 'Japan',
      lat: 35.6,
      lng: 139.6,
      name: 'Elite Four HQ',
      description: 'The headquarters of the Kanto Elite Four, where only the strongest trainers are allowed to challenge',
      price: 500.00
    },
    {
      ownerId: 3,
      address: '456 Ecruteak City',
      city: 'Johto',
      state: 'Johto',
      country: 'Japan',
      lat: 36.41,
      lng: 138.25,
      name: 'Burned Tower View',
      description: 'Luxury apartment with stunning views of the historic Burned Tower in Ecruteak City',
      price: 1000.00
    },
    {
      ownerId: 2,
      address: '789 Sootopolis City',
      city: 'Hoenn',
      state: 'Hoenn',
      country: 'Japan',
      lat: 33.93,
      lng: 131.97,
      name: 'Cave of Origin Retreat',
      description: 'A spacious villa with direct access to the Cave of Origin in Sootopolis City',
      price: 2000.00
    },
    {
      ownerId: 1, //5
      address: 'Mewtwo Drive 8',
      city: 'Cinnabar Island',
      state: 'Kanto',
      country: 'United States',
      lat: 37.77,
      lng: -122.43,
      name: 'Mewtwo Mansion',
      description: 'Grand estate on the coast of Cinnabar Island',
      price: 5000.00
    },
    {
      ownerId: 3, //6
      address: 'Bulbasaur Boulevard 3',
      city: 'Saffron City',
      state: 'Kanto',
      country: 'United States',
      lat: 40.75,
      lng: -73.99,
      name: 'Bulbasaur Bliss',
      description: 'Luxury penthouse in the heart of Saffron City',
      price: 1000.00
    },
    {
      ownerId: 2, //7
      address: 'Eevee Avenue 12',
      city: 'Goldenrod City',
      state: 'Johto',
      country: 'United States',
      lat: 37.79,
      lng: -122.41,
      name: 'Eevee Enchantment',
      description: 'Modern apartment with stunning views of the city',
      price: 500.00
    },
    {
      ownerId: 3, //8
      address: 'Charmander Circle 10',
      city: 'Viridian City',
      state: 'Kanto',
      country: 'United States',
      lat: 36.34,
      lng: 136.57,
      name: 'Charmander Charm',
      description: 'Cozy home perfect for Fire-type trainers',
      price: 200.00
    }
   ],{})
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options,null)
  }
};
