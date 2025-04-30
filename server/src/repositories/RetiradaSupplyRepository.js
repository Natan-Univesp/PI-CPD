const { Retirada_supply } = require("../models");

async function findAllRetiradas() {
   const allretiradas = await Retirada_supply.findAll();
   return allretiradas;
}

async function findAllRetiradasToner() {
   const allRetiradastoner = await Retirada_supply.findAll({
      where: {
         tipo_suprimento: "Toner"
      }
   })
   return allRetiradastoner;
}

async function findAllRetiradasCilindro() {
   const allRetiradasCilindro = await Retirada_supply.findAll({
      where: {
         tipo_suprimento: "Cilindro"
      }
   })
   return allRetiradasCilindro;
}

async function findAllRetiradasTinta() {
   const allRetiradasTinta = await Retirada_supply.findAll({
      where: {
         tipo_suprimento: "Tinta"
      }
   })
   return allRetiradasTinta;
}

async function findRetiradaById(id) {
   const retirada = await Retirada_supply.findByPk(id);
   return retirada;
}

async function findAllRetiradasByFilterWithOrderBy(dateOrderBy, whereFilter) {
   const filteredRetirada = await Retirada_supply.findAll({
      where: whereFilter,
      order: ["created_at", dateOrderBy]
   })
   return filteredRetirada;
}

async function createRetiradas(retiradaSupplyCollection) {
   const createdRetirada = await Retirada_supply.bulkCreate(retiradaSupplyCollection, {
      validate: true
   });
   return createdRetirada;
}


module.exports = {
   findAllRetiradas,
   findAllRetiradasToner,
   findAllRetiradasCilindro,
   findAllRetiradasTinta,
   findRetiradaById,
   findAllRetiradasByFilterWithOrderBy,
   createRetiradas
}