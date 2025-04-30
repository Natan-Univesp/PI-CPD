module.exports = (sequelize, DataTypes) => {
   const RetiradaSupply = sequelize.define(
      "Retirada_supply",
      {
         retirado_por: {
            type: DataTypes.STRING(120),
            allowNull: false,
         },
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
         tipo_suprimento: {
            type: DataTypes.STRING(80),
            allowNull: false
         },
         marca: {
            type: DataTypes.STRING(80),
            allowNull: false
         },
         modelo: {
            type: DataTypes.STRING(80),
            allowNull: false
         },
         qtd_solicitada: {
            type: DataTypes.INTEGER(11),
            allowNull: false
         },
      }, {
         freezeTableName: true,
         timestamps: true,
         updatedAt: false,
         underscored: true
      }
   )

   return RetiradaSupply;
}