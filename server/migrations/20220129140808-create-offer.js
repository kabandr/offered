"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Offers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      slug: {
        type: Sequelize.STRING,
      },
      candidate: {
        type: Sequelize.STRING,
      },
      role: {
        type: Sequelize.STRING,
      },
      compensation: {
        type: Sequelize.STRING,
      },
      equity: {
        type: Sequelize.STRING,
      },
      benefits: {
        type: Sequelize.TEXT,
      },
      terms: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Offers");
  },
};
