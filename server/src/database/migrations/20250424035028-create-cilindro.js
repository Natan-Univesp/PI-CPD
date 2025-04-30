"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: (queryInterface, Sequelize) => {
      return queryInterface.createTable("Cilindro", {
         id: {
            type: Sequelize.DataTypes.INTEGER(11),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
         },
         id_marca: {
            type: Sequelize.DataTypes.INTEGER(11),
            allowNull: false,
            references: { model: "Marca", key: "id" },
            onUpdate: "CASCADE",
            onDelete: "CASCADE",
         },
         modelo: {
            type: Sequelize.DataTypes.STRING(80),
            allowNull: false,
         },
         printer_compat: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
         },
         situacao: {
            type: Sequelize.DataTypes.STRING(50),
            allowNull: false,
         },
         qtd: {
            type: Sequelize.DataTypes.INTEGER(11),
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
      return queryInterface.dropTable("Cilindro");
   },
};
