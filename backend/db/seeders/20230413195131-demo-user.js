'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo@poke.io',
        firstName: 'Ashe',
        lastName: 'Test Em',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
        },
          {
          email: 'bulbasaurivy@poke.io',
          firstName: 'Ivy',
          lastName: 'Bulbasaur',
          username: 'GrassGuru',
          hashedPassword: bcrypt.hashSync('leafy456')
          },
          {
          email: 'charmanderblaze@poke.io',
          firstName: 'Blaze',
          lastName: 'Charmander',
          username: 'FireFury',
          hashedPassword: bcrypt.hashSync('flame789')
          },
          {
          email: 'squirtlesplash@poke.io',
          firstName: 'Splash',
          lastName: 'Squirtle',
          username: 'AquaAce',
          hashedPassword: bcrypt.hashSync('aquatic987')
          }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'FakeUser1', 'FakeUser2'] }
    }, {});
  }
};
