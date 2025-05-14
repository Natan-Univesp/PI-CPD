const CannotUpdateError = require("../classes/CannotUpdateError");
const ExistsDataError = require("../classes/ExistsDataError");
const NotFoundError = require("../classes/NotFoundError");
const { findMarcaById } = require("../repositories/MarcaRepository");
const {
   findAllTintas,
   findTintaById,
   findTintaByMarcaId,
   findTintaByModelo,
   createNewTinta,
   updateTinta,
   findAllTrashTintas,
   findAllTintasByMarca,
} = require("../repositories/TintaRepository");
const { removeUndefinedValuesOfObject } = require("../utils/FilterDataUtil");

async function getAllTintasService() {
   const tintas = await findAllTintas();
   return tintas;
}


async function getAllTrashTintasServices() {
   const tintas = await findAllTrashTintas();
   return tintas;
}



async function getAllTintasByMarcaServices(idMarca) {
   const tintas = await findAllTintasByMarca(idMarca);
   return tintas;
}



async function getTintaByIdService(idTinta) {
   const tinta = await findTintaById(Number(idTinta));
   return tinta;
}



async function getTintaByMarcaIdService(idMarcaTinta) {
   const tinta = await findTintaByMarcaId(idMarcaTinta);
   return tinta;
}



async function createTintaService(tintaData) {
   const { id_marca, printer_compat, qtd } = tintaData;
   let { modelo } = tintaData;
   const situacao = "ATIVO";
   modelo = modelo.toUpperCase();

   const existsMarca = await findMarcaById(id_marca);
   if (!existsMarca) {
      throw new NotFoundError("Marca não encontrada", {
         id_marca,
      });
   }

   const existsTinta = await findTintaByModelo(modelo);
   if (existsTinta) {
      throw new ExistsDataError("Tinta já cadastrado!", "SUPPLY_EXISTS", {
         modelo_passado: modelo,
         modelo_existente: existsTinta.modelo,
      });
   }

   const createdTinta = await createNewTinta({ id_marca, modelo, printer_compat, situacao, qtd });

   return createdTinta;
}



async function updateTintaService(id, newTintaData) {
   const tintaData = await findTintaById(id);

   let {
      modelo: newModelo,
   } = newTintaData;

   const filteredNewTinta = removeUndefinedValuesOfObject(newTintaData);

   if (!tintaData) {
      throw new NotFoundError("Tinta não encontrado", {
         id_passado: id,
      });
   }

   if (newModelo) {
      newModelo = newModelo.toUpperCase();
      const existsTinta = await findTintaByModelo(newModelo);
      if (existsTinta) {
         throw new ExistsDataError("Tinta já existe!", "EXISTS_TINTA", {
            modelo_passado: newModelo,
            modelo_existente: existsTinta.modelo,
         });
      }
      filteredNewTinta.modelo = newModelo;
   }

   const updatedTinta = await updateTinta(id, filteredNewTinta);

   return updatedTinta;
}



async function incrementTintaService(id, qtd_increment) {
   const existsTinta = await findTintaById(id);

   if (!existsTinta) {
      throw new NotFoundError("Tinta não encontrado", {
         id_passado: id,
      });
   }
   let { qtd } = existsTinta;
   qtd += qtd_increment;

   const updatedTinta = await updateTinta(id, { qtd });
   return updatedTinta;
}



async function decrementTintaService(modelo, qtd_decrement) {
   const existsTinta = await findTintaByModelo(modelo.toUpperCase());

   if(!existsTinta) {
      throw new NotFoundError("Tinta não encontrado", {
         modelo_passado: modelo,
      });
   }
   let { qtd } = existsTinta;
   qtd -= qtd_decrement;

   if(qtd < 0) {
      throw new CannotUpdateError("Não foi possível remover a Tinta do estoque", {
         qtd: qtd
      })
   }

   const updatedTinta = await updateTinta(existsTinta.id, { qtd });
   return updatedTinta;
}



async function changeSituacaoTintaService(id, situacao) {
   const existsTinta = await findTintaById(id);

   if (!existsTinta) {
      throw new NotFoundError("Tinta não encontrado", {
         id_passado: id,
      });
   }

   if(existsTinta.situacao === situacao) {
      throw new ExistsDataError("A Tinta já foi movida. Por favor, recarregue a página", 
         "ALREADY_MOVED_SUPPLY"
      )
   }

   const updatedTinta = await updateTinta(id, { situacao });
   return updatedTinta;
}

module.exports = { 
   getAllTintasService,
   getAllTrashTintasServices,
   getAllTintasByMarcaServices,
   getTintaByIdService, 
   getTintaByMarcaIdService, 
   createTintaService, 
   updateTintaService, 
   incrementTintaService,
   decrementTintaService,
   changeSituacaoTintaService
}
