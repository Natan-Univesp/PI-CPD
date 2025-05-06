module.exports = (sequelize, DataTypes) => {
   const RequestSupplyItens = sequelize.define(
      "Request_supply_itens", 
      {
         modelo: {
            type: DataTypes.STRING(80),
            allowNull: false,
         },
         marca: {
            type: DataTypes.STRING(80),
            allowNull: false,
         },
         categoria: {
            type: DataTypes.STRING(80),
            allowNull: false,
         },
         status: {
            type: DataTypes.STRING(100),
            allowNull: false,
         },
         qtd_solicitada: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
         },
      }, {
         freezeTableName: true,
         timestamps: true,
         underscored: true
      }
   )

   RequestSupplyItens.associate = (models) => {
      RequestSupplyItens.belongsTo(models.Request_supply, {
         constraint: true,
         foreignKey: "id_request",
         as: "request"
      });
   };

   return RequestSupplyItens;
}