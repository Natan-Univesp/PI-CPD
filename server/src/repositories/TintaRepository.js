const { Tinta, sequelize } = require("../models");

async function findAllTintas() {
   const tintas = await Tinta.findAll({
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
            sequelize.fn("DATE_FORMAT", sequelize.col("tinta.updated_at"), "%d-%m-%Y %H:%i:%s"),
            "updated_at",
         ],
      ],
      where: {
         situacao: "ATIVO",
      },
      raw: true,
   });

   return tintas;
}



async function findAllTrashTintas() {
   const tintas = await Tinta.findAll({
      include: {
         association: "marca",
         attributes: [],
      },
      attributes: [
         "id",
         "modelo",
         [sequelize.col("marca.marca"), "marca"],
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("tinta.updated_at"), "%d-%m-%Y %H:%i:%s"),
            "updated_at",
         ],
      ],
      where: {
         situacao: "INATIVO",
      },
      raw: true,
   });

   return tintas;
}



async function findAllTintasByMarca(idMarca) {
   const tintas = await Tinta.findAll({
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
            sequelize.fn("DATE_FORMAT", sequelize.col("tinta.updated_at"), "%d-%m-%Y %H:%i:%s"),
            "updated_at",
         ],
      ],
      where: {
         situacao: "ATIVO",
         id_marca: idMarca
      },
      raw: true,
   });

   return tintas;
}



async function findTintaById(idTinta) {
   const tinta = await Tinta.findByPk(idTinta, {
      include: {
         association: "marca",
      },
      attributes: { exclude: ["id_marca"] },
   });

   return tinta;
}



async function findTintaByModelo(modelo) {
   const tinta = await Tinta.findOne({
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
   return tinta;
}



async function findTintaByMarcaId(idMarca) {
   const tinta = await Tinta.findOne({
      where: { id_marca: idMarca },
      include: { association: "marca" },
      attributes: { exclude: ["id_marca"] },
   });

   return tinta;
}



async function createNewTinta(tintaData) {
   const createdTinta = await Tinta.create(tintaData);
   return createdTinta;
}



async function updateTinta(id, newTintaData) {
   const updatedTinta = await Tinta.update(newTintaData, {
      where: {
         id,
      },
   });
   return updatedTinta;
}


async function findAndCountAllTintas() {
   const { count } = await Tinta.findAndCountAll({
      where: {
         situacao: "ATIVO"
      }
   });
   return { total_registered: count };
}

module.exports = {
   findAllTintas,
   findAllTrashTintas,
   findAllTintasByMarca,
   findTintaById,
   findTintaByModelo,
   findTintaByMarcaId,
   createNewTinta,
   updateTinta,
   findAndCountAllTintas
};
