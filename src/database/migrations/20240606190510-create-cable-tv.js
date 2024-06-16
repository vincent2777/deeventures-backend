"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CableTVs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cable_provider: {
        allowNull: false,
        type: Sequelize.STRING
      },
      provider_id: {
        allowNull: false,
        type: Sequelize.STRING(11)
      },
      cable_provider_image: {
        allowNull: false,
        type: Sequelize.STRING(1000)
      },
      cable_commission: {
        allowNull: false,
        type: Sequelize.FLOAT
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
    await queryInterface.dropTable('CableTVs');
  }
};