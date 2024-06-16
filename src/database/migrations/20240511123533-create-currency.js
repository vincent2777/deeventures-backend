"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Currencies", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      currency_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      currency_buy_rate: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      currency_sell_rate: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      currency_symbol: {
        allowNull: false,
        type: Sequelize.STRING
      },
      currency_price: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      currency_is_active: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      currency_network_id: {
        allowNull: false,
        foreignKey: true,
        type: Sequelize.ARRAY(Sequelize.INTEGER)
      },
      currency_image: {
        allowNull: false,
        type: Sequelize.STRING
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
    await queryInterface.dropTable("Currencies");
  }
};