const CannotCreateError = require("../classes/CannotCreateError");
const FieldUndefinedError = require("../classes/FieldUndefinedError");
const NotFoundError = require("../classes/NotFoundError");
const errorResponse = require("../helper/ErrorResponseHelper");
const {
   getAllTonersService,
   getTonerByIdService,
   getTonerByMarcaIdService,
   createTonerService,
   incrementTonerService,
   updateTonerService,
   changeSituacaoTonerService,
   getAllTrashTonersService,
   getAllTonersByMarcaService,
} = require("../services/TonerServices");

async function getAllToners(req, res) {
   try {
      const toners = await getAllTonersService();
      return res.status(200).json(toners);

   } catch (error) {
      errorResponse(error, res);

   }
}

async function getAllTrashToners(req, res) {
   try {
      const trashToners = await getAllTrashTonersService(); 
      return res.status(200).json(trashToners);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getAllTonersByMarca(req, res) {
   try {
      const id_marca = Number(req.params.marcaId);

      if(!id_marca) {
         throw new FieldUndefinedError("Campo ID_MARCA não identificado")
      }

      const toners = await getAllTonersByMarcaService(id_marca) 
      return res.status(200).json(toners);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getTonerById(req, res) {
   try {
      const id = Number(req.params.id);

      if(!id) {
         throw new FieldUndefinedError("Campo ID não identificado")
      }

      const toner = await getTonerByIdService(id);

      if (!toner) {
         throw new NotFoundError("Toner não encontrado", {
            fields: {
               id,
            },
            data: toner
         });
      }

      res.status(200).json(toner);

   } catch (error) {
      errorResponse(error, res);

   }
}

async function getTonerByMarca(req, res) {
   try {
      const id_marca = Number(req.params.marcaId);

      if(!id_marca) {
         throw new FieldUndefinedError("Campo ID_MARCA não identificado")
      }

      const toner = await getTonerByMarcaIdService(id_marca);

      if (!toner) {
         throw new NotFoundError("Toner não encontrado", {
            fields: {
               id_marca
            },
            data: toner
         });
      }

      res.status(200).json(toner);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function createToner(req, res) {
   try {
      const { id_marca, printer_compat, qtd } = req.body;

      if(!id_marca || !printer_compat || (qtd === undefined || qtd === null)) {
         throw new FieldUndefinedError("Nenhum campo identificado", {
            dados_passados: {
               id_marca,
               printer_compat,
               qtd
            }
         });
      }

      const createdToner = await createTonerService(req.body);

      if(!createdToner) {
         throw new CannotCreateError("Erro ao tentar cadastrar o Toner", {
            tonerData: req.body
         })
      } 

      // Verifica e pega o toner com a marca
      if(Object.keys(createdToner).length > 0) {
         const { id } = createdToner;
         const createdTonerWithMarca = await getTonerByIdService(id);
         res.status(201).json({
            status: "success",
            message: "Toner Cadastrado com sucesso!",
            data: createdTonerWithMarca
         });

      }
      

   } catch (error) {
      errorResponse(error, res);

   }
}

async function updateToner(req, res) {
   try {
      const id = Number(req.params.id);
      const { id_marca, modelo, printer_compat, qtd } = req.body;

      if(!id || (!id_marca && !modelo && !printer_compat && (qtd === undefined || qtd === null))) {
         throw new FieldUndefinedError("Nenhum campo identificado", {
            situacao: {
               id,
               id_marca,
               modelo,
               printer_compat,
               qtd
            }
         });
      }

      const [rowAffected] = await updateTonerService(id, {id_marca, modelo, printer_compat, qtd});

      if(rowAffected > 0) {
         const newTonerData = await getTonerByIdService(id);
         res.status(200).json({
            status: "success",
            message: "Alterações Realizadas com sucesso!",
            data: newTonerData
         })
      }

   } catch (error) {
      errorResponse(error, res);
   }
}

async function incrementToner(req, res) {
   try {
      const id = Number(req.params.id);
      const { qtd_increment } = req.body;

      if(!id || !qtd_increment) {
         throw new FieldUndefinedError("Um ou mais campos não identificados", {
            fields: {
               id,
               qtd_increment
            }
         })
      }

      const [rowAffected] = await incrementTonerService(id, Number(qtd_increment));

      if(rowAffected > 0) {
         const newTonerData = await getTonerByIdService(id);
         res.status(200).json({
            status: "success",
            message: "Reestoque realizado com sucesso",
            data: newTonerData
         })
      }

   } catch(error) {
      errorResponse(error, res)
   }
}

async function changeSituacaoToner(req, res) {
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

      const [rowAffected] = await changeSituacaoTonerService(id, situacao);

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
   getAllToners, 
   getAllTrashToners,
   getAllTonersByMarca,
   getTonerById, 
   getTonerByMarca, 
   createToner, 
   updateToner, 
   incrementToner,
   changeSituacaoToner
}
