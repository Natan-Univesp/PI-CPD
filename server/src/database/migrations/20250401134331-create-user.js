'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("User", {
      id: {
        type: Sequelize.DataTypes.INTEGER(11),
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      user: {
        type: Sequelize.DataTypes.STRING(120),
        allowNull: false
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      nivel_acesso: {
        type: Sequelize.DataTypes.INTEGER(11),
        allowNull: false,
      },
      status: {
        type: Sequelize.DataTypes.STRING(120),
        allowNull: false
      },
      created_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DataTypes.DATE,
        allowNull: false
      }

    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("User")
  }
};
