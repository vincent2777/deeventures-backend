"use strict";

/** @type {import('sequelize-cli').Migration} */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GiftCards', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      gcard_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gcard_image: {
        allowNull: false,
        type: Sequelize.STRING
      },
      is_active: {
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
    await queryInterface.dropTable('GiftCards');
  }
};
//# sourceMappingURL=20240523150511-create-gift-card.js.map