const { where } = require("sequelize");
const { Request_supply } = require("../models");

async function findAllReqSupplies() {
   const requestSupplies = await Request_supply.findAll({ include: "request_itens" });
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

module.exports = {
   findAllReqSupplies,
   findReqSuppliesByIdRequest,
   findReqWithAvaliableItemByIdItem,
   findReqWithAvaliableItensByIdRequest,
   findReqSuppliesByFilter,
   createReqSupply,
   deleteReqSupplyByIdRequest,
};
