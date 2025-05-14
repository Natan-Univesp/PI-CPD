const { where } = require("sequelize");
const { Marca, sequelize } = require("../models");

async function findAllMarcas() {
   const marcas = await Marca.findAll({
      include: [
         {
            association: "marca_toner",
            attributes: []
         },
         {
            association: "marca_cilindro",
            attributes: []
         },
         {
            association: "marca_tinta",
            attributes: []
         }
      ],
      attributes: {
         include: [
            [sequelize.literal("(SELECT COUNT(*) FROM TONER WHERE TONER.ID_MARCA = Marca.id) + (SELECT COUNT(*) FROM CILINDRO WHERE CILINDRO.ID_MARCA = Marca.id) + (SELECT COUNT(*) FROM TINTA WHERE TINTA.ID_MARCA = Marca.id)"), 'supplies_registered'],
         ]
      },
      group: ["Marca.id"] 
      
   });
   return marcas;
}

async function findAllMarcasForSelect() {
   const marcas = await Marca.findAll({
      attributes: [
         ["marca", "label"],
         ["id", "value"]
      ]
   })
   return marcas;
}

async function findAllMarcasWithTonersForSelect() {
   const marcas = await Marca.findAll({
      include: {
         association: "marca_toner",
         attributes: [
            ["modelo", "label"],
            ["modelo", "value"]
         ],
         where: {
            situacao: "ATIVO"
         }
      },
      attributes: [
         ["marca", "label"]
      ]
   })
   return marcas;
}

async function findAllMarcasWithCilindrosForSelect() {
   const marcas = await Marca.findAll({
      include: {
         association: "marca_cilindro",
         attributes: [
            ["modelo", "label"],
            ["modelo", "value"]
         ],
         where: {
            situacao: "ATIVO"
         }
      },
      attributes: [
         ["marca", "label"]
      ]
   })
   return marcas;
}

async function findAllMarcasWithTintasForSelect() {
   const marcas = await Marca.findAll({
      include: {
         association: "marca_tinta",
         attributes: [
            ["modelo", "label"],
            ["modelo", "value"]
         ],
         where: {
            situacao: "ATIVO"
         }
      },
      attributes: [
         ["marca", "label"]
      ],
   })
   return marcas;
}

async function findMarcaById(idMarca) {
   const marca = await Marca.findByPk(idMarca);
   return marca;
}

async function findMarcaByName(marcaName) {
   const marca = await Marca.findOne({where: {marca: marcaName}});
   return marca;
}

async function createNewMarca(marcaInfo) {
   const createdMarca = await Marca.create(marcaInfo);
   return createdMarca;
}

async function updateMarca(idMarca, newMarcaInfo) {
   const updatedMarca = await Marca.update(newMarcaInfo, {
      where: {
         id: idMarca
      }
   })
   return updatedMarca;
}

module.exports = { 
   findAllMarcas, 
   findAllMarcasForSelect,
   findAllMarcasWithTonersForSelect,
   findAllMarcasWithCilindrosForSelect,
   findAllMarcasWithTintasForSelect,
   findMarcaById, 
   findMarcaByName, 
   createNewMarca, 
   updateMarca 
};