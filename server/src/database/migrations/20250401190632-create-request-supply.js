"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("Request_supply", {
         id: {
            type: Sequelize.DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         solicitante: {
            type: Sequelize.DataTypes.STRING(120),
            allowNull: false,
         },
         setor: {
            type: Sequelize.DataTypes.STRING(100),
            allowNull: false,
         },
         local: {
            type: Sequelize.DataTypes.STRING(180),
            allowNull: false,
         },
         created_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
         },
         updated_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
         },
      });
   },

   down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable("Request_supply");
   },
};
