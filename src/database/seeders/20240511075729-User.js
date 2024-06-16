"use strict";

import bcrypt from 'bcryptjs'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("Users", [
      {
        full_name: "John Doe",
        username: "jDee2024",
        email: "john@gmail.com",
        phone_number: "08033407000",
        password: bcrypt.hashSync("Password@123", 10),
        account_status: "active",
        country: "Nigeria",
        referred_by: "",
        reg_date: new Date().toLocaleDateString(),
        avatar: "https://www.ddmcheb.cz/template/img/avatar.jpeg",
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  }
};
