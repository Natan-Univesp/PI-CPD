const { where } = require("sequelize");
const { Request_supply_itens } = require("../models");

async function findAllSupplyItens() {
   const allRequestSupplyItens = await Request_supply_itens.findAll;
   return allRequestSupplyItens; 
}



async function findSupplyItemById(id) {
   const reqSupplyItem = await Request_supply_itens.findByPk(id);
   return reqSupplyItem;
}



async function findSupplyItensByIdRequest(id_request) {
   const requestSupplyItens = await Request_supply_itens.findAll({where: {id_request}})
   return requestSupplyItens;
}



async function findAndCountAllItensByIdRequest(id_request) {
   const { count } = await Request_supply_itens.findAndCountAll({
      where: {id_request}
   });
   return count;
}



async function findAndCountAllItensAvaliableByIdRequest(id_request) {
   const { count } = await Request_supply_itens.findAndCountAll({
      where: {
         id_request,
         status: "disponivel"
      }
   });
   return count;
}



async function findAndCountAllUnavaliableItensByIdRequest(id_request) {
   const { count } = await Request_supply_itens.findAndCountAll({
      where: {
         id_request,
         status: "indisponivel"
      }
   })
   return count;
}



async function findAndCountAllAvaliableItensById(id) {
   const { count } = await Request_supply_itens.findAndCountAll({
      where: {
         id,
         status: "disponivel"
      }
   })
   return count
}



async function findAndCountAllUnavaliableItensById(id) {
   const { count } = await Request_supply_itens.findAndCountAll({
      where: {
         id,
         status: "indisponivel"
      }
   })
   return count
}



async function createReqSupplyItens(reqSupplyItensCollection) {
   const createdReqSupplyItens = await Request_supply_itens.bulkCreate(reqSupplyItensCollection, {
      validate: true
   });
   return createdReqSupplyItens;
}



async function deleteReqSupplyItem(id) {
   const deletedReqSupplyItem = await Request_supply_itens.destroy({
      where: {
         id
      }
   })
   return deletedReqSupplyItem;
}



async function deleteManyReqSupplyItens(id_request) {
   const deletedReqSupplyItens = await Request_supply_itens.destroy({
      where: {
         id_request,
         status: "disponivel"
      }
   });

   return deletedReqSupplyItens;
}


module.exports = {
   findAllSupplyItens,
   findSupplyItemById,
   findSupplyItensByIdRequest,
   findAndCountAllItensByIdRequest,
   findAndCountAllItensAvaliableByIdRequest,
   findAndCountAllUnavaliableItensByIdRequest,
   findAndCountAllAvaliableItensById,
   findAndCountAllUnavaliableItensById,
   createReqSupplyItens,
   deleteReqSupplyItem,
   deleteManyReqSupplyItens
}