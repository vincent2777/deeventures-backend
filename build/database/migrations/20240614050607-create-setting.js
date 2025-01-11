"use strict";

/** @type {import('sequelize-cli').Migration} */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Settings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kyclevel1_max_withdrawal: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      kyclevel2_max_withdrawal: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      kyclevel3_max_withdrawal: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      referral_commision: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      account_bank: {
        allowNull: false,
        type: Sequelize.STRING
      },
      account_number: {
        allowNull: false,
        type: Sequelize.STRING
      },
      account_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      deposit_instructions: {
        allowNull: false,
        type: Sequelize.STRING
      },
      min_withdrawal: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      clubkonect_api: {
        type: Sequelize.TEXT
      },
      clubkonect_userid: {
        type: Sequelize.STRING
      },
      max_withdrawal: {
        allowNull: false,
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('Settings');
  }
};
//# sourceMappingURL=20240614050607-create-setting.js.map