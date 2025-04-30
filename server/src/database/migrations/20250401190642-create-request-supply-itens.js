"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("Request_supply_itens", {
         id: {
            type: Sequelize.DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         id_request: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            references: { model: "Request_supply", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
         },
         modelo: {
            type: Sequelize.DataTypes.STRING(80),
            allowNull: false,
         },
         marca: {
            type: Sequelize.DataTypes.STRING(80),
            allowNull: false,
         },
         categoria: {
            type: Sequelize.DataTypes.STRING(80),
            allowNull: false,
         },
         status: {
            type: Sequelize.DataTypes.STRING(100),
            allowNull: false,
         },
         qtd_solicitada: {
            type: Sequelize.DataTypes.INTEGER(11),
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
      return queryInterface.dropTable("Request_supply_itens");
   },
};
