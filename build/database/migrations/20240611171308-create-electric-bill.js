"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ElectricBills', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      provider_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      bill_provider: {
        allowNull: false,
        type: Sequelize.STRING
      },
      bill_commission: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      bill_provider_image: {
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
    await queryInterface.dropTable('ElectricBills');
  }
};
//# sourceMappingURL=20240611171308-create-electric-bill.js.map