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
    await queryInterface.bulkInsert("CurrencyNetworks", [{
      network_name: "BTC",
      network_address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      network_image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      network_name: "ERC20",
      network_address: "0x4d4f6f5c3c0f6a871342ab5114556655678567654321",
      network_image: "https://yourcryptolibrary.com/wp-content/uploads/2022/07/ERC-20-logo.webp",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      "network_name": "USDT",
      "network_address": "TQhE1h3bBQv4w65BB6p1B8H3vF1XRP1Y1b",
      "network_image": "https://cdn.bitkeep.vip/u_b_fdfe0be0-c215-11ed-bb06-6b42bb500220.png"
    }], {});
  },
  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("CurrencyNetworks", null, {});
  }
};
//# sourceMappingURL=20240511131832-CurrencyNetwork.js.map