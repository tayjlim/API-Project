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
        userId: 4,
        review: "My stay at Professor Oak's Lab was truly a wild experience! From the moment I arrived in Pallet Town, I felt the excitement of starting my Pokemon journey. The lab itself is well-equipped and filled with valuable knowledge about Pokemon. While the accommodations were comfortable, I was hoping for a bit more personalized attention from Professor Oak. Nonetheless, it was an unforgettable experience for any aspiring Pokemon Trainer.",
        stars: 3,
        },
        {
        spotId: 2,
        userId: 4,
        review: "he grandeur of the Indigo Plateau and the intense battles against the elite trainers left me in awe. The rooms were well-appointed, and the staff was knowledgeable and helpful. I enjoyed the challenge of battling the strong trainers and the breathtaking views from the HQ. It's a must-visit destination for any Pokemon Trainer looking to test their skills and be inspired by the best in the Kanto region!",
        stars: 4,
        },
        {
        spotId: 3,
        userId: 4,
        review: "My stay at the Burned Tower View in Ecruteak City was amazing! The luxury apartment provided stunning panoramic views of the historic Burned Tower, and the attention to detail in the decor was impressive. Ecruteak City itself is a charming location with a rich cultural heritage. I enjoyed exploring the city's beautiful architecture, visiting the local Pokemon Gym, and experiencing the warm hospitality of the Johto region. It was a delightful retreat that exceeded my expectations!",
        stars: 5,
        },
        {
        spotId: 4,
        userId: 4,
        review: "While the Cave of Origin Retreat in Sootopolis City was a decent stay, I couldn't help but feel that it could use more Eevee-evolutions. The villa itself was spacious and comfortable, and the direct access to the Cave of Origin was a unique feature. However, I was hoping for more Pokemon-themed amenities and decorations to enhance the experience. The location, though, was serene and provided a peaceful escape. Overall, it was a satisfactory stay, but I expected a bit more given the premium price.",
        stars: 2,
        }
    ])
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Reviews'
    await queryInterface.bulkDelete(options)
  }
};
