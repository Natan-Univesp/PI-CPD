"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("Retirada_supply", {
         id: {
            type: Sequelize.DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         retirado_por: {
            type: Sequelize.STRING(120),
            allowNull: false,
         },
         solicitante: {
            type: Sequelize.STRING(120),
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
         tipo_suprimento: {
            type: Sequelize.DataTypes.STRING(80),
            allowNull: false
         },
         marca: {
            type: Sequelize.DataTypes.STRING(80),
            allowNull: false
         },
         modelo: {
            type: Sequelize.DataTypes.STRING(80),
            allowNull: false
         },
         qtd_solicitada: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false
         },
         created_at: {
            type: Sequelize.DataTypes.DATE,
            allowNull: false,
         }
      });
   },

   down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable("Retirada_supply");
   },
};
