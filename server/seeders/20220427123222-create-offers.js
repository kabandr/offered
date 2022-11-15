"use strict";

const { User } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await User.findAll();

    const offers = Array(55)
      .fill(null)
      .map((_, index) => ({
        slug: `lorem-ipsum-${index + 1}`,
        candidate: `Lorem Ipsum ${index + 1}`,
        role: `Lorem Ipsum ${index + 1}`,
        compensation: `Lorem Ipsum ${index + 1}`,
        equity: `Lorem Ipsum ${index + 1}`,
        benefits: `Lorem Ipsum ${index + 1}`,
        terms: `Lorem Ipsum ${index + 1}`,
        userId: users[Math.floor(Math.random() * users.length)].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

    await queryInterface.bulkInsert("Offers", offers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Offers", null, {});
  },
};
