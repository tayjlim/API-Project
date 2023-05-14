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
        email: 'catchEmAll@poke.io',
        firstName: 'Ashe',
        lastName: 'Catch Em',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'bulbasaur@poke.io',
        firstName: 'Bulba',
        lastName: 'Saur',
        username: 'BulbaUser',
        hashedPassword: bcrypt.hashSync('grass123')
        },
        {
        email: 'charmander@poke.io',
        firstName: 'Char',
        lastName: 'Mander',
        username: 'CharUser',
        hashedPassword: bcrypt.hashSync('fire456')
        },
        {
        email: 'squirtle@poke.io',
        firstName: 'Squirt',
        lastName: 'Tle',
        username: 'SquirtUser',
        hashedPassword: bcrypt.hashSync('water789')
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
