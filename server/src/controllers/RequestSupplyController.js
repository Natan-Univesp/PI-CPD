const CannotCreateError = require("../classes/CannotCreateError");
const FieldUndefinedError = require("../classes/FieldUndefinedError");
const NotFoundError = require("../classes/NotFoundError");
const errorResponse = require("../helper/ErrorResponseHelper");
const {
   getAllReqSupplyService,
   getReqSupplyByIdService,
   getReqSupplyItemByIdService,
   registerReqSupplyService,
   removeReqSupplyItemByIdService,
} = require("../services/RequestSupplyServices");

async function getAllReqSupply(req, res) {
   try {
      const allReqSupplies = await getAllReqSupplyService();
      return res.status(200).json(allReqSupplies);
      
   } catch (error) {
      errorResponse(error, res);
   }
}



async function getReqSupplyById(req, res) {
   try {
      const id = Number(req.params.id);

      if (!id) {
         throw new FieldUndefinedError("Campo ID não identificado", {
            fields: {
               id,
            },
         });
      }

      const reqSupply = await getReqSupplyByIdService(id);

      if (!reqSupply) {
         throw new NotFoundError("Solicitação de suprimento não encontrada", {
            fields: {
               id_passado: id,
            },
            data: reqSupply
         });
      }

      return res.status(200).json(reqSupply);
   } catch (error) {
      errorResponse(error, res);
   }
}



async function getReqSupplyItemById(req, res) {
   try {
      const id_supply_item = Number(req.params.supplyId);

      if (!id_supply_item) {
         throw new FieldUndefinedError("Campo ID_SUPPLY_ITEM não identificado", {
            fields: {
               id_supply_item,
            },
         });
      }

      const reqSupplyItem = await getReqSupplyItemByIdService(id_supply_item);

      if (!reqSupplyItem) {
         throw new NotFoundError("Suprimento solicitado não encontrado", {
            fields: {
               id_passado: id_supply_item,
            },
            data: reqSupplyItem
         });
      }

      return res.status(200).json(reqSupplyItem);
   } catch (error) {
      errorResponse(error, res);
   }
}



async function registerReqSupply(req, res) {
   try {
      const { solicitante, setor, local, supplies } = req.body;

      if (!solicitante || !setor || !local || !supplies) {
         throw new FieldUndefinedError("Um ou mais campos não identificado", {
            fields: {
               solicitante,
               setor,
               local,
               supplies,
            },
         });
      }

      const createdReqSupply = await registerReqSupplyService(
         { solicitante, setor, local },
         supplies
      );

      if (!createdReqSupply) {
         throw new CannotCreateError("Não foi possível cadastrar a solicitação de suprimentos", {
            data: {
               solicitante_info: {
                  solicitante,
                  setor,
                  local,
               },
               supplies,
            },
         });
      }

      return res.status(201).json({
         status: "success",
         message: "Solicitação cadastrada com sucesso!",
         data: createdReqSupply
      });
   } catch (error) {
      errorResponse(error, res);
   }
}



async function removeReqSupplyItemById(req, res) {
   try {
      const id_supply_item = Number(req.params.supplyId);

      if (!id_supply_item) {
         throw new FieldUndefinedError("Campo ID_SUPPLY_ITEM não identificado", {
            fields: {
               id_supply_item,
            },
         });
      }

      const deletedReqSupplyItem = await removeReqSupplyItemByIdService(id_supply_item);

      if (deletedReqSupplyItem > 0) {
         return res.status(200).json({
            status: "success",
            message: "Suprimento removido com sucesso!",
         });
      }
   } catch (error) {
      console.log("entrou aqui");
      errorResponse(error, res);
   }
}

module.exports = {
   getAllReqSupply,
   getReqSupplyById,
   getReqSupplyItemById,
   registerReqSupply,
   removeReqSupplyItemById,
};
