const { Retirada_supply, sequelize } = require("../models");

async function findAllRetiradas() {
   const allretiradas = await Retirada_supply.findAll();
   return allretiradas;
}

async function findAllRetiradasToner() {
   const allRetiradastoner = await Retirada_supply.findAll({
      where: {
         tipo_suprimento: "Toner"
      },
      attributes: [
         "id",
         "retirado_por",
         "solicitante",
         "setor",
         "local",
         "marca",
         "modelo",
         "qtd_solicitada",
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("retirada_supply.created_at"), "%d-%m-%Y %H:%i:%s"),
            "created_at",
         ],
      ],
      order: [
         ["created_at", "DESC"]
      ]
   })
   return allRetiradastoner;
}

async function findAllRetiradasCilindro() {
   const allRetiradasCilindro = await Retirada_supply.findAll({
      where: {
         tipo_suprimento: "Cilindro"
      },
      attributes: [
         "id",
         "retirado_por",
         "solicitante",
         "setor",
         "local",
         "marca",
         "modelo",
         "qtd_solicitada",
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("retirada_supply.created_at"), "%d-%m-%Y %H:%i:%s"),
            "created_at",
         ],
      ],
      order: [
         ["created_at", "DESC"]
      ]
   })
   return allRetiradasCilindro;
}

async function findAllRetiradasTinta() {
   const allRetiradasTinta = await Retirada_supply.findAll({
      where: {
         tipo_suprimento: "Tinta",
      },
      attributes: [
         "id",
         "retirado_por",
         "solicitante",
         "setor",
         "local",
         "marca",
         "modelo",
         "qtd_solicitada",
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("retirada_supply.created_at"), "%d-%m-%Y %H:%i:%s"),
            "created_at",
         ],
      ],
      order: [
         ["created_at", "DESC"]
      ]
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
      attributes: [
         "id",
         "retirado_por",
         "solicitante",
         "setor",
         "local",
         "marca",
         "modelo",
         "qtd_solicitada",
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("retirada_supply.created_at"), "%d-%m-%Y %H:%i:%s"),
            "created_at",
         ],
      ],
      order: [
         ["created_at", dateOrderBy]
      ]
   })
   return filteredRetirada;
}

async function createRetiradas(retiradaSupplyCollection) {
   const createdRetirada = await Retirada_supply.bulkCreate(retiradaSupplyCollection, {
      validate: true
   });
   return createdRetirada;
}


// Contagem de retiradas
async function findAndCountAllRetiradasToner() {
   const { count } = await Retirada_supply.findAndCountAll({
      where: {
         tipo_suprimento: "Toner"
      }
   })
   return { total_retirada: count };
}

async function findAndCountAllRetiradasCilindro() {
   const { count } = await Retirada_supply.findAndCountAll({
      where: {
         tipo_suprimento: "Cilindro"
      }
   })
   return { total_retirada: count };
}

async function findAndCountAllRetiradasTinta() {
   const { count } = await Retirada_supply.findAndCountAll({
      where: {
         tipo_suprimento: "Tinta"
      }
   })
   return { total_retirada: count };
}

async function findMostRetiradaTonerOfTheMonth(currMonth) {
   const mostRetiradaToner = await Retirada_supply.findOne({
      where: [
         sequelize.where(sequelize.fn("MONTH", sequelize.col("created_at")), currMonth),
         {
            tipo_suprimento: "Toner"
         }
      ],
      attributes: [
         "modelo",
         [sequelize.fn("COUNT", sequelize.col("modelo")), "num_retiradas"]
      ],
      group: ["modelo"],
      order: [
         ["num_retiradas", "DESC"]
      ]
   })
   return mostRetiradaToner;
}

async function findMostRetiradaCilindroOfTheMonth(currMonth) {
   const mostRetiradaCilindro = await Retirada_supply.findOne({
      where: [
         sequelize.where(sequelize.fn("MONTH", sequelize.col("created_at")), currMonth),
         {
            tipo_suprimento: "Cilindro"
         }
      ],
      attributes: [
         "modelo",
         [sequelize.fn("COUNT", sequelize.col("modelo")), "num_retiradas"]
      ],
      group: ["modelo"],
      order: [
         ["num_retiradas", "DESC"]
      ]
   })
   return mostRetiradaCilindro;
}

async function findMostRetiradaTintaOfTheMonth(currMonth) {
   const mostRetiradaTinta = await Retirada_supply.findOne({
      where: [
         sequelize.where(sequelize.fn("MONTH", sequelize.col("created_at")), currMonth),
         {
            tipo_suprimento: "Tinta"
         }
      ],
      attributes: [
         "modelo",
         [sequelize.fn("COUNT", sequelize.col("modelo")), "num_retiradas"]
      ],
      group: ["modelo"],
      order: [
         ["num_retiradas", "DESC"]
      ]
   })
   return mostRetiradaTinta;
}


module.exports = {
   findAllRetiradas,
   findAllRetiradasToner,
   findAllRetiradasCilindro,
   findAllRetiradasTinta,
   findRetiradaById,
   findAllRetiradasByFilterWithOrderBy,
   createRetiradas,
   findAndCountAllRetiradasToner,
   findAndCountAllRetiradasCilindro,
   findAndCountAllRetiradasTinta,
   findMostRetiradaTonerOfTheMonth,
   findMostRetiradaCilindroOfTheMonth,
   findMostRetiradaTintaOfTheMonth
}