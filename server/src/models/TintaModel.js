module.exports = (sequelize, DataTypes) => {
   const Tinta = sequelize.define("Tinta", {
      modelo: {
         type: DataTypes.STRING(80),
         allowNull: false,
      },
      printer_compat: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      situacao: {
         type: DataTypes.STRING(50),
         allowNull: false
      },
      qtd: {
         type: DataTypes.INTEGER(11),
      },
   }, {
      freezeTableName: true,
      timestamps: true,
      underscored: true
   });

   Tinta.associate = (models) => {
      Tinta.belongsTo(models.Marca, {constraint: "true", foreignKey: "id_marca", as: "marca"});
   }

   return Tinta;

}