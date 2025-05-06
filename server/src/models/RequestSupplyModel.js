module.exports = (sequelize, DataTypes) => {
   const RequestSupply = sequelize.define(
      "Request_supply",
      {
         solicitante: {
            type: DataTypes.STRING(120),
            allowNull: false,
         },
         setor: {
            type: DataTypes.STRING(100),
            allowNull: false,
         },
         local: {
            type: DataTypes.STRING(180),
            allowNull: false,
         },
      }, {
         freezeTableName: true,
         timestamps: true,
         underscored: true
      }
   )

   RequestSupply.associate = (models) => {
      RequestSupply.hasMany(models.Request_supply_itens, {
         constraint: true,
         foreignKey: "id_request",
         as: "request_itens"
      });
   };

   return RequestSupply;
}