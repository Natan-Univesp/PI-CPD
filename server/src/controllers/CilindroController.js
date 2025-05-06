const CannotCreateError = require("../classes/CannotCreateError");
const FieldUndefinedError = require("../classes/FieldUndefinedError");
const NotFoundError = require("../classes/NotFoundError");
const errorResponse = require("../helper/ErrorResponseHelper");
const {
   getAllCilindrosService,
   getCilindroByIdService,
   getCilindroByMarcaIdService,
   createCilindroService,
   updateCilindroService,
   incrementCilindroService,
   changeSituacaoCilindroService,
   getAllTrashCilindrosService,
   getAllCilindrosByMarcaService,
} = require("../services/CilindroServices");

async function getAllCilindros(req, res) {
   try {
      const cilindros = await getAllCilindrosService();

      res.status(200).json(cilindros);
   } catch (error) {
      errorResponse(error, res);
   }
}


async function getAllTrashCilindros(req, res) {
   try {
      const trashCilindros = await getAllTrashCilindrosService();

      res.status(200).json(trashCilindros);
   } catch (error) {
      errorResponse(error, res);
   }
}



async function getAllCilindrosByMarca(req, res) {
   try {
      const id_marca = Number(req.params.marcaId);

      if(!id_marca) {
         throw new FieldUndefinedError("Campo ID_MARCA não identificado");
      }

      const cilindros = await getAllCilindrosByMarcaService(id_marca);
      return res.status(200).json(cilindros);

   } catch (error) {
      errorResponse(error, res);
   }
}



async function getCilindroById(req, res) {
   try {
      const id = Number(req.params.id);

      if (!id) {
         throw new FieldUndefinedError("Campo ID não identificado");
      }

      const cilindro = await getCilindroByIdService(id);

      if (!cilindro) {
         throw new NotFoundError("Cilindro não encontrada", {
            fields: {
               id,
            },
            data: cilindro
         });
      }

      res.status(200).json(cilindro);
   } catch (error) {
      errorResponse(error, res);
   }
}



async function getCilindroByMarca(req, res) {
   try {
      const id_marca = Number(req.params.marcaId);

      if (!id_marca) {
         throw new FieldUndefinedError("Campo ID_MARCA não identificado");
      }

      const cilindro = await getCilindroByMarcaIdService(id_marca);

      if (!cilindro) {
         throw new NotFoundError("Cilindro não encontrada", {
            fields: {
               id_marca
            },
            data: cilindro
         });
      }

      res.status(200).json(cilindro);
   } catch (error) {
      errorResponse(error, res);
   }
}



async function createCilindro(req, res) {
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

      const createdCilindro = await createCilindroService(req.body);

      if (!createdCilindro) {
         throw new CannotCreateError("Erro ao tentar cadastrar a Cilindro", {
            cilindroData: req.body,
         });
      }

      if (Object.keys(createdCilindro).length > 0) {
         const { id } = createdCilindro;
         const createdCilindroWithMarca = await getCilindroByIdService(id);
         res.status(201).json({
            status: "success",
            message: "Cilindro Cadastrado com Sucesso!",
            data: createdCilindroWithMarca
         });
      }
   } catch (error) {
      errorResponse(error, res);
   }
}



async function updateCilindro(req, res) {
   try {
      const id = Number(req.params.id);
      const { id_marca, modelo, printer_compat, qtd } = req.body;

      if (!id || (!id_marca && !modelo && !printer_compat && (qtd === undefined || qtd === null))) {
         throw new FieldUndefinedError("Nenhum campo foi identificado ou apenas o ID foi passado", {
            fields: {
               id,
               id_marca,
               modelo,
               printer_compat,
               qtd,
            },
         });
      }

      const [rowAffected] = await updateCilindroService(id, {
         id_marca,
         modelo,
         printer_compat,
         qtd,
      });

      if (rowAffected > 0) {
         const newCilindroData = await getCilindroByIdService(id);
         res.status(200).json({
            status: "success",
            message: "Alterações Realizadas com sucesso!",
            data: newCilindroData,
         });
      }
   } catch (error) {
      errorResponse(error, res);
   }
}



async function incrementCilindro(req, res) {
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

      const [rowAffected] = await incrementCilindroService(id, Number(qtd_increment));

      if (rowAffected > 0) {
         const newCilindroData = await getCilindroByIdService(id);
         res.status(200).json({
            status: "success",
            message: "Reestoque realizado com sucesso",
            data: newCilindroData,
         });
      }
   } catch (error) {
      errorResponse(error, res);
   }
}



async function changeSituacaoCilindro(req, res) {
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

      const [rowAffected] = await changeSituacaoCilindroService(id, situacao);

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
   getAllCilindros,
   getAllTrashCilindros,
   getAllCilindrosByMarca,
   getCilindroById,
   getCilindroByMarca,
   createCilindro,
   updateCilindro,
   incrementCilindro,
   changeSituacaoCilindro
}