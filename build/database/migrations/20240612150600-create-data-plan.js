"use strict";

/** @type {import('sequelize-cli').Migration} */
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = exports.default = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DataPlans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      network_id: {
        allowNull: false,
        type: Sequelize.STRING
      },
      data_plans_isp: {
        allowNull: false,
        type: Sequelize.STRING
      },
      data_plans_commission: {
        allowNull: false,
        type: Sequelize.FLOAT
      },
      data_plans_isp_image: {
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
    await queryInterface.dropTable('DataPlans');
  }
};
//# sourceMappingURL=20240612150600-create-data-plan.js.map