'use strict';

/** @type {import('sequelize-cli').Migration} */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
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
    await queryInterface.bulkInsert("Currencies", [{
      "currency_network_id": [1],
      currency_name: "Bitcoin",
      currency_has_network: 1,
      currency_buy_rate: 1000.0,
      currency_sell_rate: 1100.0,
      currency_symbol: "BTC",
      currency_price: 1105.0,
      currency_is_active: 1,
      currency_image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Bitcoin.svg/2048px-Bitcoin.svg.png",
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      currency_network_id: [2],
      currency_name: "Ethereum",
      currency_has_network: 1,
      currency_buy_rate: 300.0,
      currency_sell_rate: 310.0,
      currency_symbol: "ETH",
      currency_price: 305.0,
      currency_is_active: 1,
      currency_image: "https://cdn.freelogovectors.net/wp-content/uploads/2022/05/ethereum_logo_freelogovectors.net_.png",
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
    await queryInterface.bulkDelete("Currencies", null, {});
  }
};
//# sourceMappingURL=20240511131821-Currency.js.map