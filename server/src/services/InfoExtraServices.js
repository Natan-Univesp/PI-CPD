const { findAndCountAllCilindros } = require("../repositories/CilindroRepository");
const {
   findAndCountRequestedToners,
   findAndCountRequestedCilindros,
   findAndCountRequestedTintas,
} = require("../repositories/RequestSupplyItensRepository");
const { findAndCountAllRequested } = require("../repositories/RequestSupplyRepository");
const {
   findMostRetiradaTonerOfTheMonth,
   findMostRetiradaCilindroOfTheMonth,
   findMostRetiradaTintaOfTheMonth,
   findAndCountAllRetiradasToner,
   findAndCountAllRetiradasCilindro,
   findAndCountAllRetiradasTinta,
} = require("../repositories/RetiradaSupplyRepository");
const { findAndCountAllTintas } = require("../repositories/TintaRepository");
const { findAndCountAllToners } = require("../repositories/TonerRepository");
const { findAndCountAllUsers, findAndCountAllActiveUsers } = require("../repositories/UserRepository");

// Total de suprimentos cadastrados
async function getTotalRegisteredTonersServices() {
   const allRegisteredToners = await findAndCountAllToners();
   return allRegisteredToners;
}

async function getTotalRegisteredCilindrosServices() {
   const allRegisteredCilindros = await findAndCountAllCilindros();
   return allRegisteredCilindros;
}

async function getTotalRegisteredTintasServices() {
   const allRegisteredTintas = await findAndCountAllTintas();
   return allRegisteredTintas;
}

// Total de suprimentos retirados
async function getTotalRetiradasTonersServices() {
   const totalRetiradasToners = await findAndCountAllRetiradasToner();
   return totalRetiradasToners;
}

async function getTotalRetiradasCilindrosServices() {
   const totalRetiradasCilindros = await findAndCountAllRetiradasCilindro();
   return totalRetiradasCilindros;
}

async function getTotalRetiradasTintasServices() {
   const totalRetiradasTintas = await findAndCountAllRetiradasTinta();
   return totalRetiradasTintas;
}

// Suprimentos mais solicitados
async function getMostRetiradaTonerOfTheMonthServices() {
   const month = new Date().getMonth() + 1;
   const mostRetiradaToner = await findMostRetiradaTonerOfTheMonth(month);
   return mostRetiradaToner;
}

async function getMostRetiradaCilindroOfTheMonthServices() {
   const month = new Date().getMonth() + 1;
   const mostRetiradaCilindro = await findMostRetiradaCilindroOfTheMonth(month);
   return mostRetiradaCilindro;
}

async function getMostRetiradaTintaOfTheMonthServices() {
   const month = new Date().getMonth() + 1;
   const mostRetiradaTinta = await findMostRetiradaTintaOfTheMonth(month);
   return mostRetiradaTinta;
}

// Total de suprimentos Solicitados
async function getTotalAllRequestedServices() {
   const totalRequested = await findAndCountAllRequested();
   return totalRequested;
}

async function getTotalRequestedTonersServices() {
   const totalRequested = await findAndCountRequestedToners();
   return totalRequested;
}

async function getTotalRequestedCilindrosServices() {
   const totalRequested = await findAndCountRequestedCilindros();
   return totalRequested;
}

async function getTotalRequestedTintasServices() {
   const totalRequested = await findAndCountRequestedTintas();
   return totalRequested;
}


// Informações de usuários
async function getTotalUsersServices() {
   const totalUsers = await findAndCountAllUsers();
   return totalUsers;
}

async function getTotalActiveUsersServices() {
   const totalActiveUsers = await findAndCountAllActiveUsers();
   return totalActiveUsers;
}

module.exports = {
   getTotalRegisteredTonersServices,
   getTotalRegisteredCilindrosServices,
   getTotalRegisteredTintasServices,
   getTotalRetiradasTonersServices,
   getTotalRetiradasCilindrosServices,
   getTotalRetiradasTintasServices,
   getMostRetiradaTonerOfTheMonthServices,
   getMostRetiradaCilindroOfTheMonthServices,
   getMostRetiradaTintaOfTheMonthServices,
   getTotalAllRequestedServices,
   getTotalRequestedTonersServices,
   getTotalRequestedCilindrosServices,
   getTotalRequestedTintasServices,
   getTotalUsersServices,
   getTotalActiveUsersServices
};
