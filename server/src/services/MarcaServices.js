const { findAllMarcas, findMarcaById, findMarcaByName, createNewMarca, updateMarca, findAllMarcasForSelect, findAllMarcasWithTonersForSelect, findAllMarcasWithCilindrosForSelect, findAllMarcasWithTintasForSelect } = require("../repositories/MarcaRepository");
// Helpers
const deleteFile = require("../helper/DeleteFileHelper");
// Utils
const { setFirstLetterToUpperCase } = require("../utils/DataFormatUtil");
const { removeUndefinedValuesOfObject } = require("../utils/FilterDataUtil");
// Erros Customizados
const ExistsDataError = require("../classes/ExistsDataError");
const NotFoundError = require("../classes/NotFoundError");

async function getAllMarcasService() {
   const marcas = await findAllMarcas();
   return marcas;
}

async function getAllMarcasForSelectService() {
   const marcas = await findAllMarcasForSelect();
   return marcas;
}

async function getAllMarcasWithTonersForSelectService() {
   const marcasWithToners = await findAllMarcasWithTonersForSelect();
   let formattedData = JSON.parse(JSON.stringify(marcasWithToners));

   if(!Array.isArray(formattedData)) {
      formattedData = Array(formattedData);
   }

   const renamedData = formattedData.map(item => (
      {
         label: item.label,
         options: item.marca_toner
      }
   ))
   return renamedData;
}

async function getAllMarcasWithCilindrosForSelectService() {
   const marcasWithCilindros = await findAllMarcasWithCilindrosForSelect();
   let formattedData = JSON.parse(JSON.stringify(marcasWithCilindros));

   if(!Array.isArray(formattedData)) {
      formattedData = Array(formattedData);
   }

   const renamedData = formattedData.map(item => (
      {
         label: item.label,
         options: item.marca_cilindro
      }
   ))
   return renamedData;
}

async function getAllMarcasWithTintasForSelectService() {
   const marcasWithTintas = await findAllMarcasWithTintasForSelect();
   let formattedData = JSON.parse(JSON.stringify(marcasWithTintas));

   if(!Array.isArray(formattedData)) {
      formattedData = Array(formattedData);
   }

   const renamedData = formattedData.map(item => (
      {
         label: item.label,
         options: item.marca_tinta
      }
   ))
   return renamedData;
}

async function getMarcaByIdService(idMarca) {
   const marca = await findMarcaById(idMarca);
   return marca;
}

async function createMarcaService(marcaInfo) {
   const { marca, img } = marcaInfo;
   const formattedMarca = setFirstLetterToUpperCase(marca);
   const existsMarca = await findMarcaByName(formattedMarca);

   if(existsMarca) {
      throw new ExistsDataError("Marca já cadastrada", "MARCA_EXISTS", {
         marca_informada: formattedMarca,
         marca_existente: existsMarca.marca
      })
   }

   const createdMarca = createNewMarca({
      marca: formattedMarca,
      img: img
   });

   return createdMarca;

}

async function updateMarcaByIdService(id, newMarcaData) {
   const marcaData = await findMarcaById(id);
   let { marca: newMarca, img: newImg } = newMarcaData;
   const filteredNewMarcaData = removeUndefinedValuesOfObject(newMarcaData); 

   // Verifica se a marca a ser editada existe
   if(!marcaData) {
      throw new NotFoundError("Marca não encontrada", {
         id_passada: id
      })
   }

   // Verifica se já existe outra marca com o mesmo nome passado
   if(newMarca) {
      newMarca = newMarca.toLowerCase();
      const existsMarca = await findMarcaByName(newMarca);
      if(existsMarca) {
         throw new ExistsDataError("Marca já existe!", "EXISTS_MARCA", {
            marca_passada: newMarca,
            marca_existente: existsMarca.marca
         })
      }
   }

   const updatedMarca = await updateMarca(id, filteredNewMarcaData);

   // Se a imagem for alterada, remove a antiga;
   if(newImg) {
      const oldImg = marcaData.img;
      await deleteFile(oldImg);

   }
   


   return updatedMarca;
   
   
} 

module.exports = {
   getAllMarcasService, 
   getAllMarcasForSelectService,
   getAllMarcasWithTonersForSelectService,
   getAllMarcasWithCilindrosForSelectService,
   getAllMarcasWithTintasForSelectService,
   getMarcaByIdService, 
   createMarcaService, 
   updateMarcaByIdService
}