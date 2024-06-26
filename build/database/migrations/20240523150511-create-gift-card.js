"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
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
      gcard_country: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gcard_currency: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gcard_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      gcard_sellprice: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      gcard_min_sell: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      gcard_minrate_range: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      gcard_maxrate_range: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      gcard_naira_rate_range: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      gcard_buyprice: {
        allowNull: false,
        type: Sequelize.INTEGER
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