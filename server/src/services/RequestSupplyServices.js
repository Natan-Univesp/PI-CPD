const {
   findSupplyItemById,
   deleteReqSupplyItem,
   createReqSupplyItens,
   findAndCountAllItensByIdRequest,
   findAndCountAllUnavaliableItensByIdRequest,
   deleteManyReqSupplyItens,
   findAndCountAllItensAvaliableByIdRequest,
   findAndCountAllUnavaliableItensById,
} = require("../repositories/RequestSupplyItensRepository");
const {
   findAllReqSupplies,
   createReqSupply,
   findReqSuppliesByIdRequest,
   deleteReqSupplyByIdRequest,
   findReqWithAvaliableItemByIdItem,
   findReqWithAvaliableItensByIdRequest,
} = require("../repositories/RequestSupplyRepository");
const { findTonerByModelo } = require("../repositories/TonerRepository");
const { findCilindroByModelo } = require("../repositories/CilindroRepository");
const { findTintaByModelo } = require("../repositories/TintaRepository");
const { removeAllAcentsForString } = require("../utils/DataFormatUtil");
const CannotCreateError = require("../classes/CannotCreateError");
const CannotDeleteError = require("../classes/CannotDeleteError");
const NotFoundError = require("../classes/NotFoundError");



async function getAllReqSupplyService() {
   const allReqSupplies = await findAllReqSupplies();
   return allReqSupplies;
}



async function getReqSupplyByIdService(id) {
   const reqSupplies = await findReqSuppliesByIdRequest(id);
   return reqSupplies;
}


// Utilizado em RetiradaController
async function getAllAvaliableSuppliesByIdRequestService(id_request) {
   const allAvaliableReqSupply = await findReqWithAvaliableItensByIdRequest(id_request);
   const unavaliableItensSupply = await findAndCountAllUnavaliableItensByIdRequest(id_request);

   if(!allAvaliableReqSupply && unavaliableItensSupply > 0) {
      throw new NotFoundError("A solicitação foi encontrada porém um ou mais itens não estão disponíveis no estoque", {
         fields: {
            id_request
         }
      })
   }
   return allAvaliableReqSupply.get({plain: true});
}


// Utilizado em RetiradaController
async function getAvaliableReqSupplyByIdItemService(id_supply_item) {
   const reqSupplies = await findReqWithAvaliableItemByIdItem(id_supply_item);
   const unavaliableItensSupply = await findAndCountAllUnavaliableItensById(id_supply_item);

   if(!reqSupplies && unavaliableItensSupply > 0) {
      throw new NotFoundError("A solicitação foi encontrada porém o item não está disponível no estoque", {
         fields: {
            id_supply_item
         }
      })
   }

   return reqSupplies.get({plain: true});
}



// Request_supply_itens Repository
async function getReqSupplyItemByIdService(id_supply_item) {
   const reqSupplyItem = await findSupplyItemById(id_supply_item);
   return reqSupplyItem;
}



async function registerReqSupplyService(reqSupplyData, reqSupplyItemCollection) {
   const preparedSupplyItensCollection = await Promise.all(
      reqSupplyItemCollection.map(async (supplyItem) => {
         let supplyCache;
         if(supplyItem.tipo === "Toner") {
            supplyCache = await findTonerByModelo(supplyItem.supply);

         } else if(supplyItem.tipo === "Cilindro") {
            supplyCache = await findCilindroByModelo(supplyItem.supply);

         } else if(supplyItem.tipo === "Tinta") {
            supplyCache = await findTintaByModelo(supplyItem.supply);

         }

         const status = supplyItem.qtd > supplyCache.qtd ? "INDISPONIVEL" : "DISPONIVEL";
         return {
            modelo: supplyItem.supply, 
            marca: supplyCache.marca.toUpperCase(), 
            categoria: supplyItem.tipo, 
            status, 
            qtd_solicitada: 
            supplyItem.qtd
         };
      })
   )

   const createdReqSupply = await createReqSupply(reqSupplyData);

   if (!createdReqSupply.id) {
      throw new CannotCreateError("Não foi possível cadastrar a solicitação", {
         data: createdReqSupply,
      });
   }

   const id_request = createdReqSupply.id;

   const reqSupplyItemCollectionWithId = preparedSupplyItensCollection.map((item) => {
      return { id_request, ...item };
   });

   const createdReqSupplyItems = await createReqSupplyItens(reqSupplyItemCollectionWithId);
   if (!createdReqSupplyItems) {
      throw new CannotCreateError("Não foi possível cadastrar a solicitação", {
         data_items: reqSupplyItemCollectionWithId,
      });
   }
   return { request_supply: createdReqSupply, request_supply_itens: createdReqSupplyItems };
}



async function deleteOneForRetiradaSupplyService(id_supply_item) {
   // Verifica se o suprimento a ser retirado existe
   const existsReqSupplyItem = await findSupplyItemById(id_supply_item);

   if (!existsReqSupplyItem) {
      throw new NotFoundError("Não foi possível encontrar o suprimento", {
         id_passado: id_supply_item,
      });
   }

   const { status, id_request } = existsReqSupplyItem;

   // Verifica se o suprimento está disponível no estoque
   if (removeAllAcentsForString(status) === "indisponivel") {
      throw new CannotDeleteError("Suprimento indisponível no estoque", "ESTOQUE_INDISPONIVEL", {
         data: {
            status,
         },
      });
   }

   // Se existe e está disponível no estoque, efetua a exclusão
   const deletedReqSupplyItem = await deleteReqSupplyItem(id_supply_item);

   if (!deletedReqSupplyItem) {
      throw new Error("Nenhum registro deletado");
   }

   // verifica se ainda há algum suprimento a ser retirado dentro da solicitação
   // Caso exista, o delete da solicitação é realizada
   const existsReqSupplyRemain = await findAndCountAllItensByIdRequest(id_request);
   if (existsReqSupplyRemain === 0) {
      const deletedReqSupply = await deleteReqSupplyByIdRequest(id_request);

      if (!deletedReqSupply) {
         throw new Error("Não foi possível deletar a solicitação");
      }
      return deletedReqSupply;
   }
   return true;
}



async function deleteAllForRetiradaSupplyService(idReqSupply) {

   const allReqSupplies = await findReqSuppliesByIdRequest(idReqSupply);
   const avaliableReqSupplies = await findAndCountAllItensAvaliableByIdRequest(idReqSupply);
   const unavaliableReqSupplies = await findAndCountAllUnavaliableItensByIdRequest(idReqSupply);

   if (!allReqSupplies) {
      throw new NotFoundError("Nenhuma solicitação encontrada", {
         data: {
            id_passado: idReqSupply,
         },
      });
   }

   if(avaliableReqSupplies === 0 && unavaliableReqSupplies > 0) {
      throw new CannotDeleteError("Não foi possível Deletar o registro", "ESTOQUE_INDISPONIVEL", {
         data: {
            suprimentos_indisponiveis: unavaliableReqSupplies
         }
      });

   } else if(avaliableReqSupplies > 0 && unavaliableReqSupplies === 0) {
      const deletedReqSupply = await deleteReqSupplyByIdRequest(idReqSupply);
      if (!deletedReqSupply) {
         throw new Error("Nenhum registro deletado");
      }
   
   } else {
      const deletedReqSupplyItens = await deleteManyReqSupplyItens(idReqSupply);
      if (!deletedReqSupplyItens) {
         throw new Error("Nenhum registro deletado");
      }
   }

   return true;
}



async function removeReqSupplyItemByIdService(id_supply_item) {
   const existsReqSupplyItem = await findSupplyItemById(id_supply_item);

   if (!existsReqSupplyItem) {
      throw new NotFoundError("Suprimento não encontrado", {
         id_passado: id_supply_item,
      });
   }

   const { id_request } = existsReqSupplyItem;

   const deletedReqSupplyItem = await deleteReqSupplyItem(id_supply_item);

   if(!deletedReqSupplyItem) {
      throw new Error("Nenhum registro deletado");
   }


   // verifica se ainda há algum suprimento a ser retirado dentro da solicitação
   // Caso exista, o delete da solicitação é realizada
   const existsReqSupplyRemain = await findAndCountAllItensByIdRequest(id_request);
   if (existsReqSupplyRemain === 0) {
      const deletedReqSupply = await deleteReqSupplyByIdRequest(id_request);

      if (!deletedReqSupply) {
         throw new Error("Não foi possível deletar a solicitação");
      }
   }

   return deletedReqSupplyItem;
}

module.exports = {
   getAllReqSupplyService,
   getReqSupplyByIdService,
   getAllAvaliableSuppliesByIdRequestService,
   getAvaliableReqSupplyByIdItemService,
   getReqSupplyItemByIdService,
   registerReqSupplyService,
   deleteOneForRetiradaSupplyService,
   deleteAllForRetiradaSupplyService,
   removeReqSupplyItemByIdService
}
