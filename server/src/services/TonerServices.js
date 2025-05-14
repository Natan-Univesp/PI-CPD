const ExistsDataError = require("../classes/ExistsDataError");
const NotFoundError = require("../classes/NotFoundError");
const { findMarcaById } = require("../repositories/MarcaRepository");
const {
   findAllToners,
   findTonerById,
   findTonerByMarcaId,
   findTonerByModelo,
   createNewToner,
   updateToner,
   findAllTrashToners,
   findAllTonersByMarca,
} = require("../repositories/TonerRepository");
const { removeUndefinedValuesOfObject } = require("../utils/FilterDataUtil");



async function getAllTonersService() {
   const toners = await findAllToners();
   return toners;
}


async function getAllTrashTonersService() {
   const toners = await findAllTrashToners();
   return toners;
}


async function getAllTonersByMarcaService(idMarca) {
   const toners = await findAllTonersByMarca(Number(idMarca));
   return toners;
}



async function getTonerByIdService(idToner) {
   const toner = await findTonerById(Number(idToner));
   return toner;
}



async function getTonerByMarcaIdService(idMarcaToner) {
   const toner = await findTonerByMarcaId(idMarcaToner);
   return toner;
}



async function createTonerService(tonerData) {
   const { id_marca, printer_compat, qtd } = tonerData;
   let { modelo } = tonerData;
   const situacao = "ATIVO";
   modelo = modelo.toUpperCase();

   const existsMarca = await findMarcaById(id_marca);
   if (!existsMarca) {
      throw new NotFoundError("Marca não encontrada", {
         id_marca,
      });
   }

   const existsToner = await findTonerByModelo(modelo);
   if (existsToner) {
      throw new ExistsDataError("Toner já cadastrado!", "SUPPLY_EXISTS", {
         modelo_passado: modelo,
         modelo_existente: existsToner.modelo,
      });
   }

   const createdToner = await createNewToner({ id_marca, modelo, printer_compat, situacao, qtd });

   return createdToner;
}



async function updateTonerService(id, newTonerData) {
   const tonerData = await findTonerById(id);

   let {
      id_marca: newIdMarca,
      modelo: newModelo,
      printer_compat: newPrinterCompat,
      qtd: newQtd,
   } = newTonerData;

   const filteredNewToner = removeUndefinedValuesOfObject(newTonerData);

   if(!tonerData) {
      throw new NotFoundError("Toner não encontrado", {
         id_passado: id
      })
   }

   if(newModelo) {
      newModelo = newModelo.toUpperCase();
      const existsToner = await findTonerByModelo(newModelo);
      if(existsToner) {
         throw new ExistsDataError("Toner já existe!", "EXISTS_TONER", {
            modelo_passado: newModelo,
            modelo_existente: existsToner.modelo
         })
      }
   }

   const updatedToner = await updateToner(id, filteredNewToner);

   return updatedToner;
   

}



async function incrementTonerService(id, qtd_increment) {
   const existsToner = await findTonerById(id);

   if (!existsToner) {
      throw new NotFoundError("Toner não encontrado", {
         id_passado: id,
      });
   }
   let { qtd } = existsToner;
   qtd += qtd_increment;

   const updatedToner = await updateToner(id, { qtd });
   return updatedToner;
}



async function decrementTonerService(modelo, qtd_decrement) {
   const existsToner = await findTonerByModelo(modelo);

   if(!existsToner) {
      throw new NotFoundError("Toner não encontrado", {
         modelo_passado: modelo
      })
   }
   let { qtd } = existsToner;
   qtd -= qtd_decrement;
   
   if(qtd >= 0) {
      const updatedToner = await updateToner(existsToner.id, { qtd });
      return updatedToner;
   }

}



async function changeSituacaoTonerService(id, situacao) {
   const existsToner = await findTonerById(id);

   if(!existsToner) {
      throw new NotFoundError("Toner não encontrado", {
         id_passado: id
      })
   }

   if(existsToner.situacao === situacao) {
      throw new ExistsDataError("O Toner já foi movido. Por favor, recarregue a página", 
         "ALREADY_MOVED_SUPPLY"
      )
   }

   const updatedToner = await updateToner(id, { situacao });
   return updatedToner;
}

module.exports = {
   getAllTonersService,
   getAllTrashTonersService,
   getAllTonersByMarcaService,
   getTonerByIdService,
   getTonerByMarcaIdService,
   createTonerService,
   updateTonerService,
   incrementTonerService,
   decrementTonerService,
   changeSituacaoTonerService
};
