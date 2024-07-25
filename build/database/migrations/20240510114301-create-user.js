"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      full_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },
      phone_number: {
        allowNull: true,
        type: Sequelize.STRING
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      account_status: {
        allowNull: false,
        type: Sequelize.ENUM("active", "pending"),
        defaultValue: "active"
      },
      country: {
        allowNull: true,
        type: Sequelize.STRING
      },
      referred_by: {
        allowNull: true,
        type: Sequelize.STRING
      },
      reg_date: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
        // defaultValue: new Date().getTime()
      },
      avatar: {
        allowNull: true,
        type: Sequelize.STRING,
        defaultValue: "https://www.ddmcheb.cz/template/img/avatar.jpeg"
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
    await queryInterface.dropTable('Users');
  }
};
//# sourceMappingURL=20240510114301-create-user.js.map