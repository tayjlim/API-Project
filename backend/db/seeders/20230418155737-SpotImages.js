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
        url: 'https://cdn.discordapp.com/attachments/1090663657639268482/1106597902480064562/512b8873-f6cc-4290-b9e6-a4bf91b8804e.png',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://cdn.discordapp.com/attachments/1090663657639268482/1106597903331512393/0c5512ff-0e40-4871-9c60-c7ff02329150.png',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://cdn.discordapp.com/attachments/1090663657639268482/1106597904090681344/bb8d373a-bb11-47b3-b875-cedbe6f645f5.png',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://cdn.discordapp.com/attachments/1090663657639268482/1106597904606576750/4606a6c8-5c56-41d4-b28e-a449df7e040f.png',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://cdn.discordapp.com/attachments/1090663657639268482/1106597905013428254/4f117541-c7dd-4189-afe1-00d3be9ad024.png',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://cdn.discordapp.com/attachments/1090663657639268482/1105236835568980018/4230cf88-3e59-4fbe-80ae-bd56d2350ab2.png',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://cdn.discordapp.com/attachments/1090663657639268482/1105236836047138927/8dbcd9de-eb4e-4540-8dba-463c9f9c248a.png',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://cdn.discordapp.com/attachments/1090663657639268482/1105236836428812440/106bdc0a-a0ed-42a1-8a25-9822f3b19854.png',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://cdn.discordapp.com/attachments/1090663657639268482/1105236836856639599/7e7711e5-16be-4430-be5a-3bebd639e994.png',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://cdn.discordapp.com/attachments/1090663657639268482/1105236837473194174/8209a078-6565-4683-b85c-3b35eea3cca8.png',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/1090663657639268482/1105234980478664855/3a6e9b62-da6b-4a76-af0b-003eafc7b8ec.png',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/1090663657639268482/1105234980814213231/68d5ccb4-194c-4470-9e61-d0aa02b1c9d0.png',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/1090663657639268482/1105234981132976310/b5e80c78-9c34-4105-800b-afaf7b9e8398.png',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/1090663657639268482/1105234981464309845/3c4b59fb-2d48-4fff-88d9-8d7728b50fa0.png',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://cdn.discordapp.com/attachments/1090663657639268482/1105234981812457522/9b3dcfc6-da57-4c07-a1bd-11edc37ad57f.png',
        preview: true
      },

      {
        spotId: 4,
        url: "https://cdn.discordapp.com/attachments/1090663657639268482/1106599732010295356/45fe0ffd-7569-4bad-8ccc-620d0a625c65.png",
        preview: true
      },
      {
        spotId: 4,
        url: "https://cdn.discordapp.com/attachments/1090663657639268482/1106599732320686150/22ee9232-35fd-4f24-a34f-663a02a3aa32.png",
        preview: true
      },
      {
        spotId: 4,
        url: "https://cdn.discordapp.com/attachments/1090663657639268482/1106599732622667816/273d5cbb-5b8d-4e5f-aee9-f11a7b6ede93.png",
        preview: true
      },
      {
        spotId: 4,
        url: "https://cdn.discordapp.com/attachments/1090663657639268482/1106599732924653598/502efe05-a55c-4ab7-ad78-a6dac63d3841.png",
        preview: true
      },
      {
        spotId: 4,
        url: "https://cdn.discordapp.com/attachments/1090663657639268482/1106599733306339379/f43c6389-a320-448a-bd6c-9fce83a40bc8.png",
        preview: true
      },
      {
      spotId:5,
      url:'https://media.discordapp.net/attachments/1090663657639268482/1159263587399893092/1f6c495e-b877-4a48-9f2c-d8012f640166.png?ex=65306359&is=651dee59&hm=7248b3f43bd4cd0604184b3ca6d98ed1a0134fdbce737445fb10146d700bbe6f&=&width=1159&height=652'
      preview: true
      },
      {
        spotId:5,
        url:'https://media.discordapp.net/attachments/1090663657639268482/1159263587773206621/795eaac1-1b49-4580-afc5-0767a47e0a2f.png?ex=65306359&is=651dee59&hm=d2d1bffa7e3c19e3ec637ec671a305358125168c918083e038ef448cbdd64d70&=',
        preview: true
        },
        {
          spotId:5,
          url:'https://media.discordapp.net/attachments/1090663657639268482/1159263588117127248/da92c3fc-de7e-44fb-9871-55ce0ddb2c62.png?ex=65306359&is=651dee59&hm=08dbf3b775bced768207a96067e9a36a6dab0beaa8c655007163de215f667354&=',
          preview: true
          },
          {
            spotId:5,
            url:'https://media.discordapp.net/attachments/1090663657639268482/1159263588612067388/8f2af184-d619-4811-9f88-86c353292f29.png?ex=65306359&is=651dee59&hm=fa0bd5e636a1dfedb318b642f59a2208da545a99e19f0b836a83907c2c22df4c&=',
            preview: true
          },
          {
            spotId:5,
            url:'https://media.discordapp.net/attachments/1090663657639268482/1159263588914036786/28ca731f-a9a4-4791-b698-e32bb88fa251.png?ex=65306359&is=651dee59&hm=150cc562a83ca26198419618417a0d767791e6ce3cefa4571f64859b2cabd11a&=',
            preview: true
          }

    ])

  },

  async down (queryInterface, Sequelize) {
    options.TableName = 'SpotImages'
    await queryInterface.bulkDelete(options)
  }
};
