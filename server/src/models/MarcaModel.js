module.exports = (sequelize, DataTypes) => {
   const Marca = sequelize.define(
      "Marca",
      {
         marca: {
            type: DataTypes.STRING(80),
            allowNull: false,
         },
         img: {
            type: DataTypes.STRING,
            allowNull: false,
         },
      }, {
         freezeTableName: true,
         timestamps: true,
         underscored: true
      });

   Marca.associate = (models) => {
      Marca.hasMany(models.Toner, { constraint: true, foreignKey: "id_marca", as: "marca_toner" });
      Marca.hasMany(models.Cilindro, {constraint: true, foreignKey: "id_marca", as: "marca_cilindro"});
      Marca.hasMany(models.Tinta, {constraint: true, foreignKey: "id_marca", as: "marca_tinta"});
   };

   return Marca;
};
