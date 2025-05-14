const { where } = require("sequelize");
const { Request_supply, sequelize } = require("../models");

async function findAllReqSupplies() {
   const requestSupplies = await Request_supply.findAll({
      include: {
         association: "request_itens",
         attributes: [
            "id",
            "modelo",
            "marca",
            "categoria",
            "qtd_solicitada",
            "status"
         ]
      },
      attributes: [
         "id",
         "solicitante",
         "setor",
         "local",
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("request_itens.created_at"), "%d-%m-%Y %H:%i:%s"),
            "created_at",
         ],
      ]
   });
   return requestSupplies;
}

async function findReqSuppliesByIdRequest(id) {
   const requestSupplies = await Request_supply.findByPk(id, { include: "request_itens" });
   return requestSupplies;
   
}

async function findReqWithAvaliableItemByIdItem(id_supply_item) {
   const requestSupplies = await Request_supply.findOne({ 
      include: {
         association: "request_itens",
         where: {
            id: id_supply_item,
            status: "disponivel"
         },
         attributes: [
            "modelo",
            "marca",
            ["categoria", "tipo_suprimento"],
            "qtd_solicitada"
         ],
      }
   });

   return requestSupplies;
}

async function findReqWithAvaliableItensByIdRequest(id) {
   const avaliableReqSupplies = await Request_supply.findByPk(id, {
      include: {
         association: "request_itens",
         where: {
            status: "disponivel",
         },
         attributes: [
            "modelo",
            "marca",
            ["categoria", "tipo_suprimento"],
            "qtd_solicitada"
         ]
      }
   });

   return avaliableReqSupplies;
}

async function findReqSuppliesByFilter(whereFields) {
   const filteredReqSupplies = await Request_supply.findAll({
      where: {
         whereFields,
      },
   });
   return filteredReqSupplies;
}

async function createReqSupply(requestSupplyData) {
   const createdRequestSupply = await Request_supply.create(requestSupplyData);
   return createdRequestSupply;
}

async function deleteReqSupplyByIdRequest(id) {
   const deletedRequestSupply = await Request_supply.destroy({
      where: {
         id,
      },
   });
   return deletedRequestSupply;
}

async function findAndCountAllRequested() {
   const { count } = await Request_supply.findAndCountAll();
   return { total_requested: count };
}

module.exports = {
   findAllReqSupplies,
   findReqSuppliesByIdRequest,
   findReqWithAvaliableItemByIdItem,
   findReqWithAvaliableItensByIdRequest,
   findReqSuppliesByFilter,
   createReqSupply,
   deleteReqSupplyByIdRequest,
   findAndCountAllRequested
};
