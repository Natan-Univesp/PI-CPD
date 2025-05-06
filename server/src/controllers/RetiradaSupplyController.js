const CannotCreateError = require("../classes/CannotCreateError");
const FieldUndefinedError = require("../classes/FieldUndefinedError");
const NotFoundError = require("../classes/NotFoundError");
const errorResponse = require("../helper/ErrorResponseHelper");
const { deleteOneForRetiradaSupplyService, getAvaliableReqSupplyByIdItemService, getAllAvaliableSuppliesByIdRequestService, deleteAllForRetiradaSupplyService } = require("../services/RequestSupplyServices");
const { getAllRetiradasService, getAllRetiradasTonerService, getAllRetiradasCilindroService, getAllRetiradasTintaService, getRetiradaByIdService, getAllRetiradasByFilterWithOrderByService, createRetiradasService } = require("../services/RetiradaSupplyServices");

async function getAllRetiradas(req, res) {
   try {
      const allRetiradas = await getAllRetiradasService();
      return res.status(200).json(allRetiradas);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllRetiradasToner(req, res) {
   try {
      const tonersRetirados = await getAllRetiradasTonerService();
      return res.status(200).json(tonersRetirados);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllRetiradasCilindro(req, res) {
   try {
      const cilindrosRetirados = await getAllRetiradasCilindroService();
      return res.status(200).json(cilindrosRetirados);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllRetiradasTinta(req, res) {
   try {
      const tintasRetiradas = await getAllRetiradasTintaService();
      return res.status(200).json(tintasRetiradas);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getRetiradaById(req, res) {
   try {
      const id = Number(req.params.id);

      if(!id) {
         throw new FieldUndefinedError("Campo ID não identificado", {
            fields: {
               id
            }
         })
      }

      const retirada = await getRetiradaByIdService(id);

      if(!retirada) {
         throw new NotFoundError("Suprimento retirado não encontrado", {
            fields: {
               id
            },
            data: retirada
         })
      }

      return res.status(200).json(retirada);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllRetiradasByFilter(req, res) {
   try {
      const { orderBy, filterOptions } = req.body;

      if(!orderBy && !filterOptions) {
         throw new FieldUndefinedError("Um ou mais campos não identificados", {
            fields: {
               orderBy,
               filterOptions
            }
         })
      }

      const filteredRetirada = await getAllRetiradasByFilterWithOrderByService(orderBy, filterOptions)

      if(!filteredRetirada) {
         throw new NotFoundError("Nenhuma retirada encontrada", {
            fields: {
               orderBy,
               filterOptions
            },
            data: filteredRetirada
         })
      }
      return res.status(200).json(filteredRetirada);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function createRetirada(req, res) {
   try {
      const { id_reqSupply, id_supply_item, retirado_por } = req.body;
      let createdRetiradaSupply;

      if(id_reqSupply && id_supply_item) {
         throw new Error("Apenas um campo é permitido");
      }

      if((!id_reqSupply && !id_supply_item) || !retirado_por) {
         throw new FieldUndefinedError("Um ou mais campos não identificados", {
            fields: {
               id_reqSupply,
               id_supply_item,
               retirado_por
            }
         })
      };

      if(id_supply_item) {
         const reqInfo = await getAvaliableReqSupplyByIdItemService(id_supply_item);

         if(!reqInfo) {
            throw new NotFoundError("Não foi possível efetuar a retirada. Nenhuma solicitação foi encontrada", {
               fields: {
                  id_supply_item
               }
            })
         }
         const { solicitante, setor, local, request_itens } = reqInfo;

         const deletedRequestSupply = await deleteOneForRetiradaSupplyService(id_supply_item);

         if(!deletedRequestSupply) {
            throw new Error("Nenhum registro deletado");
         }

         createdRetiradaSupply = await createRetiradasService({retirado_por, solicitante, setor, local, supplies: request_itens});


      } else if(id_reqSupply) {
         const reqInfo = await getAllAvaliableSuppliesByIdRequestService(id_reqSupply);

         if(!reqInfo) {
            throw new NotFoundError("Não foi possível efetuar a retirada. Nenhuma solicitação foi encontrada", {
               fields: {
                  id_reqSupply
               }
            })
         }

         const { solicitante, setor, local, request_itens } = reqInfo;

         const deletedAllRequestSupplies = await deleteAllForRetiradaSupplyService(id_reqSupply);

         if(!deletedAllRequestSupplies) {
            throw new Error("Nenhum registro deletado");
         }

         createdRetiradaSupply = await createRetiradasService({retirado_por, solicitante, setor, local, supplies: request_itens})

      }


      if(!createdRetiradaSupply) {
         throw new CannotCreateError("Não foi possível cadastrar a retirada do suprimento", {
            data: createdRetiradaSupply
         })
      }

      return res.status(201).json({
         status: "success",
         message: "Retirada de suprimento finalizada!",
         data: createdRetiradaSupply
      });


   } catch (error) {
      errorResponse(error, res);
   }
}

module.exports = {
   getAllRetiradas,
   getAllRetiradasToner,
   getAllRetiradasCilindro,
   getAllRetiradasTinta,
   getRetiradaById,
   getAllRetiradasByFilter,
   createRetirada
};