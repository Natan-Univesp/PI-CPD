const FieldUndefinedError = require("../classes/FieldUndefinedError");
const NotFoundError = require("../classes/NotFoundError");
const CannotCreateError = require("../classes/CannotCreateError");
const errorResponse = require("../helper/ErrorResponseHelper");
const {
   getAllTintasService,
   getTintaByIdService,
   getTintaByMarcaIdService,
   createTintaService,
   updateTintaService,
   incrementTintaService,
   getAllTrashTintasServices,
   changeSituacaoTintaService,
   getAllTintasByMarcaServices,
} = require("../services/TintaServices");

async function getAllTintas(req, res) {
   try {
      const tintas = await getAllTintasService();
      return res.status(200).json(tintas);

   } catch (error) {
      errorResponse(error, res);
   }
}


async function getAllTrashTintas(req, res) {
   try {
      const trashTintas = await getAllTrashTintasServices();
      return res.status(200).json(trashTintas);
      
   } catch (error) {
      errorResponse(error, res);
   }
}


async function getAllTintasByMarca(req, res) {
   try {
      const id_marca = Number(req.params.marcaId);

      if(!id_marca) {
         throw new FieldUndefinedError("Campo ID_MARCA não identificado");
      }

      const tintas = await getAllTintasByMarcaServices(id_marca);
      return res.status(200).json(tintas);

   } catch (error) {
      errorResponse(error, res);
   }
}


async function getTintaById(req, res) {
   try {
      const id = Number(req.params.id);

      if (!id) {
         throw new FieldUndefinedError("Campo ID não identificado");
      }

      const tinta = await getTintaByIdService(id);

      if (!tinta) {
         throw new NotFoundError("Tinta não encontrada", {
            fields: {
               id,
            },
            data: tinta
         });
      }

      res.status(200).json(tinta);
   } catch (error) {
      errorResponse(error, res);
   }
}



async function getTintaByMarca(req, res) {
   try {
      const id_marca = Number(req.params.marcaId);

      if (!id_marca) {
         throw new FieldUndefinedError("Campo ID_MARCA não identificado");
      }

      const tinta = await getTintaByMarcaIdService(id_marca);

      if (!tinta) {
         throw new NotFoundError("Tinta não encontrada", {
            fields: {
               id_marca
            },
            data: tinta
         });
      }

      res.status(200).json(tinta);
   } catch (error) {
      errorResponse(error, res);
   }
}



async function createTinta(req, res) {
   try {
      const { id_marca, printer_compat, qtd } = req.body;

      if (!id_marca || !printer_compat || (qtd === undefined || qtd === null)) {
         throw new FieldUndefinedError("Nenhum campo identificado", {
            dados_passados: {
               id_marca,
               printer_compat,
               qtd,
            },
         });
      }

      const createdTinta = await createTintaService(req.body);

      if (!createdTinta) {
         throw new CannotCreateError("Erro ao tentar cadastrar a Tinta", {
            tintaData: req.body,
         });
      }

      if (Object.keys(createdTinta).length > 0) {
         const { id } = createdTinta;
         const createdTintaWithMarca = await getTintaByIdService(id);
         res.status(201).json({
            status: "success",
            message: "Tinta Cadastrada com Sucesso!",
            data: createdTintaWithMarca
         });
      }
   } catch (error) {
      errorResponse(error, res);
   }
}



async function updateTinta(req, res) {
   try {
      const id = Number(req.params.id);
      const { id_marca, modelo, printer_compat, qtd } = req.body;

      if (!id || (!id_marca && !modelo && !printer_compat && (qtd === undefined || qtd === null))) {
         throw new FieldUndefinedError("Nenhum campo foi identificado ou apenas o ID foi passado", {
            situacao: {
               id,
               id_marca,
               modelo,
               printer_compat,
               qtd,
            },
         });
      }

      const [rowAffected] = await updateTintaService(id, { id_marca, modelo, printer_compat, qtd });

      if (rowAffected > 0) {
         const newTintaData = await getTintaByIdService(id);
         res.status(200).json({
            status: "success",
            message: "Alterações Realizadas com sucesso!",
            data: newTintaData,
         });
      }
   } catch (error) {
      errorResponse(error, res);
   }
}



async function incrementTinta(req, res) {
   try {
      const id = Number(req.params.id);
      const { qtd_increment } = req.body;

      if (!id || !qtd_increment) {
         throw new FieldUndefinedError("Um ou mais campos não identificados", {
            fields: {
               id,
               qtd_increment,
            },
         });
      }

      const [rowAffected] = await incrementTintaService(id, Number(qtd_increment));

      if (rowAffected > 0) {
         const newTintaData = await getTintaByIdService(id);
         res.status(200).json({
            status: "success",
            message: "Reestoque realizado com sucesso",
            data: newTintaData,
         });
      }
   } catch (error) {
      errorResponse(error, res);
   }
}



async function changeSituacaoTinta(req, res) {
   try {
      const id = Number(req.params.id);
      let { situacao } = req.body;

      if(!id || !situacao) {
         throw new FieldUndefinedError("Um ou mais campos não identificados", {
            fields: {
               id, 
               situacao
            }
         })
      }
      situacao = situacao.toUpperCase();

      const [rowAffected] = await changeSituacaoTintaService(id, situacao);

      if(rowAffected > 0) {
         return res.status(200).json({
            status: "success",
            message: "alteração da lixeira realizada com sucesso!"
         })
      }

   } catch (error) {
         errorResponse(error, res);
   }  
}

module.exports = {
   getAllTintas,
   getAllTrashTintas,
   getAllTintasByMarca,
   getTintaById,
   getTintaByMarca,
   createTinta,
   updateTinta,
   incrementTinta,
   changeSituacaoTinta
};
