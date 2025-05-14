const errorResponse = require("../helper/ErrorResponseHelper");
const {
   getTotalRegisteredTonersServices,
   getTotalRegisteredCilindrosServices,
   getTotalRegisteredTintasServices,
   getTotalRetiradasTonersServices,
   getTotalRetiradasCilindrosServices,
   getTotalRetiradasTintasServices,
   getMostRetiradaTintaOfTheMonthServices,
   getMostRetiradaCilindroOfTheMonthServices,
   getMostRetiradaTonerOfTheMonthServices,
   getTotalRequestedTonersServices,
   getTotalRequestedCilindrosServices,
   getTotalRequestedTintasServices,
   getTotalAllRequestedServices,
   getTotalUsersServices,
   getTotalActiveUsersServices,
} = require("../services/InfoExtraServices");

async function getTotalRegisteredToners(req, res) {
   try {
      const totalRegisteredToners = await getTotalRegisteredTonersServices();
      return res.status(200).json(totalRegisteredToners);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getTotalRegisteredCilindros(req, res) {
   try {
      const totalRegisteredCilindros = await getTotalRegisteredCilindrosServices();
      return res.status(200).json(totalRegisteredCilindros);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getTotalRegisteredTintas(req, res) {
   try {
      const totalRegisteredTintas = await getTotalRegisteredTintasServices();
      return res.status(200).json(totalRegisteredTintas);
   } catch (error) {
      errorResponse(error, res);
   }
}


async function getTotalRetiradasToners(req, res) {
   try {
      const totalRetiradaToners = await getTotalRetiradasTonersServices();
      return res.status(200).json(totalRetiradaToners);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getTotalRetiradasCilindros(req, res) {
   try {
      const totalRetiradaCilindros = await getTotalRetiradasCilindrosServices();
      return res.status(200).json(totalRetiradaCilindros);
      
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getTotalRetiradasTintas(req, res) {
   try {
      const totalRetiradaTintas = await getTotalRetiradasTintasServices();
      return res.status(200).json(totalRetiradaTintas);
      
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getMostRetiradaTonerOfTheMonth(req, res) {
   try {
      const mostRetiradaToner = await getMostRetiradaTonerOfTheMonthServices();

      if(!mostRetiradaToner) {
         return res.status(200).json({modelo: "Nenhum"});
      }

      return res.status(200).json(mostRetiradaToner);
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getMostRetiradaCilindroOfTheMonth(req, res) {
   try {
      const mostRetiradaCilindro = await getMostRetiradaCilindroOfTheMonthServices();

      if(!mostRetiradaCilindro) {
         return res.status(200).json({modelo: "Nenhum"});
      }

      return res.status(200).json(mostRetiradaCilindro);

   } catch (error) {
      errorResponse(error, res);
   }
}

async function getMostRetiradaTintaOfTheMonth(req, res) {
   try {
      const mostRetiradaTinta = await getMostRetiradaTintaOfTheMonthServices();

      if(!mostRetiradaTinta) {
         return res.status(200).json({modelo: "Nenhum"});
      }

      return res.status(200).json(mostRetiradaTinta);
      
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getTotalAllRequested(req, res) {
   try {
      const totalRequested = await getTotalAllRequestedServices();
      return res.status(200).json(totalRequested);
      
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getTotalRequestedToners(req, res) {
   try {
      const totalRequested = await getTotalRequestedTonersServices();
      return res.status(200).json(totalRequested);
      
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getTotalRequestedCilindros(req, res) {
   try {
      const totalRequested = await getTotalRequestedCilindrosServices();
      return res.status(200).json(totalRequested);
      
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getTotalRequestedTintas(req, res) {
   try {
      const totalRequested = await getTotalRequestedTintasServices();
      return res.status(200).json(totalRequested);
      
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getTotalUsers(req, res) {
   try {
      const totalUsers = await getTotalUsersServices();
      return res.status(200).json(totalUsers);
      
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getTotalActiveUsers(req, res) {
   try {
      const totalActiveUsers = await getTotalActiveUsersServices();
      return res.status(200).json(totalActiveUsers);
      
   } catch (error) {
      errorResponse(error, res);
   }
}

module.exports = {
   getTotalRegisteredToners,
   getTotalRegisteredCilindros,
   getTotalRegisteredTintas,
   getTotalRetiradasToners,
   getTotalRetiradasCilindros,
   getTotalRetiradasTintas,
   getMostRetiradaTonerOfTheMonth,
   getMostRetiradaCilindroOfTheMonth,
   getMostRetiradaTintaOfTheMonth,
   getTotalAllRequested,
   getTotalRequestedToners,
   getTotalRequestedCilindros,
   getTotalRequestedTintas,
   getTotalUsers,
   getTotalActiveUsers
};
