const CannotUpdateError = require("../classes/CannotUpdateError");
const ExistsDataError = require("../classes/ExistsDataError");
const NotFoundError = require("../classes/NotFoundError");
const {
   findAllCilindros,
   findCilindroById,
   findCilindroByMarcaId,
   findCilindroByModelo,
   createNewCilindro,
   updateCilindro,
   findAllTrashCilindros,
   findAllCilindrosByMarca,
} = require("../repositories/CilindroRepository");
const { findMarcaById } = require("../repositories/MarcaRepository");
const { removeUndefinedValuesOfObject } = require("../utils/FilterDataUtil");


async function getAllCilindrosService() {
   const cilindros = await findAllCilindros();
   return cilindros;
}



async function getAllTrashCilindrosService() {
   const cilindros = await findAllTrashCilindros();
   return cilindros;
}



async function getAllCilindrosByMarcaService(idMarca) {
   const cilindros = await findAllCilindrosByMarca(idMarca);
   return cilindros;
}



async function getCilindroByIdService(idCilindro) {
   const cilindro = await findCilindroById(Number(idCilindro));
   return cilindro;
}



async function getCilindroByMarcaIdService(idMarcaCilindro) {
   const cilindro = await findCilindroByMarcaId(idMarcaCilindro);
   return cilindro;
}



async function createCilindroService(cilindroData) {
   const { id_marca, printer_compat, qtd } = cilindroData;
   let { modelo } = cilindroData;
   const situacao = "ATIVO";
   modelo = modelo.toUpperCase();

   const existsMarca = await findMarcaById(id_marca);
   if (!existsMarca) {
      throw new NotFoundError("Marca não encontrada", {
         id_marca,
      });
   }

   const existsCilindro = await findCilindroByModelo(modelo);
   if (existsCilindro) {
      throw new ExistsDataError("Cilindro já cadastrado!", "SUPPLY_EXISTS", {
         modelo_passado: modelo,
         modelo_existente: existsCilindro.modelo,
      });
   }

   const createdCilindro = await createNewCilindro({ id_marca, modelo, printer_compat, situacao, qtd });

   return createdCilindro;
}



async function updateCilindroService(id, newCilindroData) {
   const cilindroData = await findCilindroById(id);

   let { modelo: newModelo } = newCilindroData;

   const filteredNewCilindro = removeUndefinedValuesOfObject(newCilindroData);

   if (!cilindroData) {
      throw new NotFoundError("Cilindro não encontrado", {
         id_passado: id,
      });
   }

   if (newModelo) {
      newModelo = newModelo.toUpperCase();
      const existsCilindro = await findCilindroByModelo(newModelo);
      if (existsCilindro) {
         throw new ExistsDataError("Cilindro já existe!", "EXISTS_Cilindro", {
            modelo_passado: newModelo,
            modelo_existente: existsCilindro.modelo,
         });
      }
      filteredNewCilindro.modelo = newModelo;
   }

   const updatedCilindro = await updateCilindro(id, filteredNewCilindro);

   return updatedCilindro;
}



async function incrementCilindroService(id, qtd_increment) {
   const existsCilindro = await findCilindroById(id);

   if (!existsCilindro) {
      throw new NotFoundError("Cilindro não encontrado", {
         id_passado: id,
      });
   }
   let { qtd } = existsCilindro;
   qtd += qtd_increment;

   const updatedCilindro = await updateCilindro(id, { qtd });
   return updatedCilindro;
}



async function decrementCilindroService(modelo, qtd_decrement) {
   const existsCilindro = await findCilindroByModelo(modelo.toUpperCase());

   if(!existsCilindro) {
      throw new NotFoundError("Toner não encontrado", {
         modelo_passado: modelo
      })
   }
   let { qtd } = existsCilindro;
   qtd -= qtd_decrement;

   if(qtd < 0) {
      throw new CannotUpdateError("Não foi possível remover o Cilindro do estoque", {
         qtd: qtd
      })
   } 

   const updatedCilindro = await updateCilindro(existsCilindro.id, { qtd });
   return updatedCilindro;
}



async function changeSituacaoCilindroService(id, situacao) {
   const existsCilindro = await findCilindroById(id);

   if (!existsCilindro) {
      throw new NotFoundError("Cilindro não encontrado", {
         id_passado: id,
      });
   }

   if(existsCilindro.situacao === situacao) {
      throw new ExistsDataError("O Cilindro já foi movido. Por favor, recarregue a página", 
         "ALREADY_MOVED_SUPPLY"
      )
   }

   const updatedCilindro = await updateCilindro(id, { situacao });
   return updatedCilindro;
}

module.exports = { 
   getAllCilindrosService,
   getAllTrashCilindrosService,
   getAllCilindrosByMarcaService,
   getCilindroByIdService, 
   getCilindroByMarcaIdService, 
   createCilindroService, 
   updateCilindroService, 
   incrementCilindroService,
   decrementCilindroService,
   changeSituacaoCilindroService
}
