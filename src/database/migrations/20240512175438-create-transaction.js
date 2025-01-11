"use strict";

/** @type {import('sequelize-cli').Migration} */
export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transactions", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      trnx_amount: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      trnx_reference: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      trnx_date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      trnx_type: {
        allowNull: false,
        type: Sequelize.ENUM("Gift Card Sale", "Coin Purchase", "Coin Sale", "Bill Payment", "Wallet Funding", "Fund Withdrawal", "Promo Usage"),
      },
      trnx_desc: {
        allowNull: false,
        type: Sequelize.STRING
      },
      trnx_status: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      trnx_rate: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      trnx_address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      trnx_image: {
        type: Sequelize.STRING
      },
      to_receive: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      currency: {
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
    await queryInterface.dropTable("Transactions");
  }
};