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
      ownerId: 1, // 1
      address: 'Snitch n9ne Street',
      city: 'OceanSide',
      state: 'New York',
      country: 'United States',
      lat: 50.66,
      lng: 45.99,
      name: '6ixN9ne',
      description: 'Fake gangsters crib in California',
      price: 69.69
    },
    {
      ownerId: 2, //2
      address: '123 Main St',
      city: 'Los Angeles',
      state: 'California',
      country: 'United States',
      lat: 34.05,
      lng: -118.24,
      name: 'The Hollywood House',
      description: 'Luxurious mansion in the heart of Hollywood',
      price: 10000.00
    },
    {
      ownerId: 3, //3
      address: '456 Park Ave',
      city: 'New York',
      state: 'New York',
      country: 'United States',
      lat: 40.76,
      lng: -73.97,
      name: 'Central Park View',
      description: 'Luxury apartment with stunning views of Central Park',
      price: 5000.00
    },
    {
      ownerId: 2, //4
      address: '789 Beach Blvd',
      city: 'Miami',
      state: 'Florida',
      country: 'United States',
      lat: 25.76,
      lng: -80.13,
      name: 'Oceanfront Villa',
      description: 'Spacious villa with direct access to the beach',
      price: 7500.00
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
      ownerId: 9, //6
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
      ownerId: 8, //7
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
      ownerId: 6, //8
      address: 'Charmander Circle 10',
      city: 'Viridian City',
      state: 'Kanto',
      country: 'United States',
      lat: 36.34,
      lng: 136.57,
      name: 'Charmander Charm',
      description: 'Cozy home perfect for Fire-type trainers',
      price: 200.00
    },
    {
      ownerId: 5, //9
      address: 'Pikachu Lane 1',
      city: 'Pallet Town',
      state: 'Kanto',
      country: 'United States',
      lat: 34.55,
      lng: 138.25,
      name: 'Pikachu Paradise',
      description: 'Adorable cottage in the heart of Pallet Town',
      price: 100.00
    }

   ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots';
    return queryInterface.bulkDelete(options,null)
  }
};
