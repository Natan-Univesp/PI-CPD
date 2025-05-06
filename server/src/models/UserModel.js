module.exports = (sequelize, DataTypes) => {
   const User = sequelize.define("User", {
      user: {
         type: DataTypes.STRING(120),
         allowNull: false,
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false,
      },
      nivel_acesso: {
         type: DataTypes.INTEGER(11),
         allowNull: false,
      },
      status: {
         type: DataTypes.STRING(120),
         allowNull: false,
      },
   }, {
      freezeTableName: true,
      timestamps: true,
      underscored: true
   });

   return User;

};
