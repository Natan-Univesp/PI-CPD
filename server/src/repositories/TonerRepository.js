const { where, Op } = require("sequelize");
const { Toner, sequelize } = require("../models");

async function findAllToners() {
   const toners = await Toner.findAll({
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
            sequelize.fn("DATE_FORMAT", sequelize.col("toner.updated_at"), "%d-%m-%Y %H:%i:%s"),
            "updated_at",
         ],
      ],
      where: {
         situacao: "ATIVO",
      },
      raw: true,
   });
   return toners;
}



async function findAllTrashToners() {
   const toners = await Toner.findAll({
      include: {
         association: "marca",
         attributes: [],
      },
      attributes: [
         "id",
         "modelo",
         [sequelize.col("marca.marca"), "marca"],
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("toner.updated_at"), "%d-%m-%Y %H:%i:%s"),
            "updated_at",
         ],
      ],
      where: {
         situacao: "INATIVO",
      },
      raw: true
   });
   return toners;
}


async function findAllTonersByMarca(idMarca) {
   const toners = await Toner.findAll({
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
            sequelize.fn("DATE_FORMAT", sequelize.col("toner.updated_at"), "%d-%m-%Y %H:%i:%s"),
            "updated_at",
         ],
      ],
      where: {
         situacao: "ATIVO",
         id_marca: idMarca
      },
      raw: true,
   });
   return toners;
}



async function findTonerById(idToner) {
   const toner = await Toner.findByPk(idToner, {
      include: {
         association: "marca",
      },
      attributes: { exclude: ["id_marca"] },
   });
   return toner;
}



async function findTonerByModelo(modelo) {
   const toner = await Toner.findOne({ where: { modelo } });
   return toner;
}



async function findTonerByMarcaId(idMarcaToner) {
   const toner = await Toner.findOne({
      where: { id_marca: idMarcaToner },
      include: { association: "marca" },
      attributes: { exclude: ["id_marca"] },
   });
   return toner;
}



async function createNewToner(tonerData) {
   const createdToner = await Toner.create(tonerData);
   return createdToner;
}



async function updateToner(id, newTonerData) {
   const updatedToner = await Toner.update(newTonerData, {
      where: {
         id,
      },
   });
   return updatedToner;
}

module.exports = {
   findAllToners,
   findAllTrashToners,
   findAllTonersByMarca,
   findTonerById,
   findTonerByModelo,
   findTonerByMarcaId,
   createNewToner,
   updateToner,
};
