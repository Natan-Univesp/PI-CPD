const CannotCreateError = require("../classes/CannotCreateError");
const {
   findAllRetiradas,
   findAllRetiradasToner,
   findAllRetiradasCilindro,
   findAllRetiradasTinta,
   findRetiradaById,
   findAllRetiradasByFilterWithOrderBy,
   createRetiradas,
} = require("../repositories/RetiradaSupplyRepository");
const { decrementCilindroService } = require("./CilindroServices");
const { decrementTintaService } = require("./TintaServices");
const { decrementTonerService } = require("./TonerServices");

async function getAllRetiradasService() {
   const allRetiradas = await findAllRetiradas();
   return allRetiradas;
}

async function getAllRetiradasTonerService() {
   const allTonersRetirados = await findAllRetiradasToner();
   return allTonersRetirados;
}

async function getAllRetiradasCilindroService() {
   const allCilindrosRetirados = await findAllRetiradasCilindro();
   return allCilindrosRetirados;
}

async function getAllRetiradasTintaService() {
   const allTintasRetiradas = await findAllRetiradasTinta();
   return allTintasRetiradas;
}

async function getRetiradaByIdService(id) {
   const retirada = await findRetiradaById(Number(id));
   return retirada;
}

async function getAllRetiradasByFilterWithOrderByService(orderBy, filterOptions) {
   const orderByUpperCase = String(orderBy).toUpperCase();
   const filterOptionsNotEmpty = Object.entries(filterOptions).reduce((acc, [key, value]) => {
      if(value) {
         acc[key] = value;
      }
      return acc;
   }, {});

   const filteredRetirada = await findAllRetiradasByFilterWithOrderBy(
      orderByUpperCase,
      filterOptionsNotEmpty
   );
   return filteredRetirada;
}

async function createRetiradasService(retiradaData) {
   const { retirado_por, solicitante, setor, local, supplies } = retiradaData;

   const retiradaCollection = await Promise.all(
      supplies.map(async(supply) => {
         const modelToUpperCase = supply.modelo;
         if(supply.tipo_suprimento === "Toner") {
            await decrementTonerService(modelToUpperCase, supply.qtd_solicitada);
         
         } else if(supply.tipo_suprimento === "Cilindro") {
            await decrementCilindroService(modelToUpperCase, supply.qtd_solicitada);

         } else if(supply.tipo_suprimento === "Tinta") {
            await decrementTintaService(modelToUpperCase, supply.qtd_solicitada);
         
         } else {
            throw new CannotCreateError("Não foi possível retirar o(s) suprimento(s)")
         }
         return { retirado_por, solicitante, setor, local, ...supply };
      })
   )

   const createdRetirada = await createRetiradas(retiradaCollection);

   return createdRetirada;
}

module.exports = {
   getAllRetiradasService,
   getAllRetiradasTonerService,
   getAllRetiradasCilindroService,
   getAllRetiradasTintaService,
   getRetiradaByIdService,
   getAllRetiradasByFilterWithOrderByService,
   createRetiradasService,
};
