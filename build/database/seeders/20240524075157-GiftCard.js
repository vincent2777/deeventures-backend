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
      gcard_country: "United State of America",
      gcard_currency: "USD",
      gcard_type: "open-loop card",
      gcard_sellprice: 50,
      gcard_min_sell: 48.9,
      gcard_minrate_range: 45.0,
      gcard_maxrate_range: 50.0,
      gcard_naira_rate_range: 450000,
      gcard_buyprice: 50,
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