const {
   findAllRetiradas,
   findAllRetiradasToner,
   findAllRetiradasCilindro,
   findAllRetiradasTinta,
   findRetiradaById,
   findAllRetiradasByFilterWithOrderBy,
   createRetiradas,
} = require("../repositories/RetiradaSupplyRepository");

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
   const filteredRetirada = await findAllRetiradasByFilterWithOrderBy(
      orderByUpperCase,
      filterOptions
   );
   return filteredRetirada;
}

async function createRetiradasService(retiradaData) {
   const { retirado_por, solicitante, setor, local, supplies } = retiradaData;

   const retiradaCollection = supplies.map((item) => {
      return { retirado_por, solicitante, setor, local, ...item };
   });

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
