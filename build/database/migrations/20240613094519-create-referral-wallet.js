"use strict";

/** @type {import('sequelize-cli').Migration} */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ReferralWallets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      amount: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      currency_symbol: {
        allowNull: false,
        type: Sequelize.STRING,
        default: "$"
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ReferralWallets');
  }
};
//# sourceMappingURL=20240613094519-create-referral-wallet.js.map