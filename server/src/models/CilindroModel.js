module.exports = (sequelize, DataTypes) => {
   const Cilindro = sequelize.define("Cilindro", {
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

   Cilindro.associate = (models) => {
      Cilindro.belongsTo(models.Marca, {constraint: "true", foreignKey: "id_marca", as: "marca"});
   }

   return Cilindro;

}