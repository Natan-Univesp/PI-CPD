const { Cilindro, sequelize } = require("../models");

async function findAllCilindros() {
   const cilindros = await Cilindro.findAll({
      include: {
         association: "marca",
         attributes: [],
      },
      attributes: [
         "id",
         "modelo",
         [sequelize.col("marca.marca"), "marca"],
         [sequelize.col("marca.img"), "img"],
         "printer_compat",
         "qtd",
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("cilindro.updated_at"), "%d-%m-%Y %H:%i:%s"),
            "updated_at",
         ],
      ],
      where: {
         situacao: "ATIVO",
      },
      raw: true,
   });

   return cilindros;
}



async function findAllTrashCilindros() {
   const cilindros = await Cilindro.findAll({
      include: {
         association: "marca",
         attributes: [],
      },
      attributes: [
         "id",
         "modelo",
         [sequelize.col("marca.marca"), "marca"],
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("cilindro.updated_at"), "%d-%m-%Y %H:%i:%s"),
            "updated_at",
         ],
      ],
      where: {
         situacao: "INATIVO",
      },
      raw: true,
   });

   return cilindros;
}



async function findAllCilindrosByMarca(idMarca) {
   const cilindros = await Cilindro.findAll({
      include: {
         association: "marca",
         attributes: [],
      },
      attributes: [
         "id",
         "modelo",
         [sequelize.col("marca.marca"), "marca"],
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("cilindro.updated_at"), "%d-%m-%Y %H:%i:%s"),
            "updated_at",
         ],
      ],
      where: {
         situacao: "ATIVO",
         id_marca: idMarca
      },
      raw: true,
   });

   return cilindros;   
}



async function findCilindroById(idCilindro) {
   const cilindro = await Cilindro.findByPk(idCilindro, {
      include: {
         association: "marca",
      },
      attributes: { exclude: ["id_marca"] },
   });

   return cilindro;
}



async function findCilindroByModelo(modelo) {
   const cilindro = await Cilindro.findOne({
      include: {
         association: "marca",
         attributes: []
      },
      attributes: {
         include: [
            [sequelize.col("marca.marca"), "marca"]
         ]
      },
      where: { 
         modelo
      },
      raw: true
   });
   return cilindro;
}



async function findCilindroByMarcaId(idMarca) {
   const cilindro = await Cilindro.findOne({
      where: { id_marca: idMarca },
      include: { association: "marca" },
      attributes: { exclude: ["id_marca"] },
   });

   return cilindro;
}



async function createNewCilindro(cilindroData) {
   const createdCilindro = await Cilindro.create(cilindroData);
   return createdCilindro;
}



async function updateCilindro(id, newCilindroData) {
   const updatedCilindro = await Cilindro.update(newCilindroData, {
      where: {
         id,
      },
   });
   return updatedCilindro;
}



async function findAndCountAllCilindros() {
   const { count } = await Cilindro.findAndCountAll({
      where: {
         situacao: "ATIVO"
      }
   });
   return { total_registered: count };
}

module.exports = {
   findAllCilindros,
   findAllTrashCilindros,
   findAllCilindrosByMarca,
   findCilindroById,
   findCilindroByModelo,
   findCilindroByMarcaId,
   createNewCilindro,
   updateCilindro,
   findAndCountAllCilindros
};
