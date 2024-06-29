"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("GiftCards", [{
      gcard_name: "Amazon Card",
      gcard_image: "https://www.hrkgame.com/media/screens/amazon-50-gift-card/amazon_800x500.jpg",
      is_active: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("GiftCards", null, {});
  }
};
//# sourceMappingURL=20240524075157-GiftCard.js.map