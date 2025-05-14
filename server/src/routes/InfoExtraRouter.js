const { Router } = require("express");
const infoExtraController = require("../controllers/InfoExtraController.js");

const router = Router();

// total de suprimentos cadastrados
router
   .route("/toners/total-registered")
   .get(infoExtraController.getTotalRegisteredToners)

router
   .route("/cilindros/total-registered")
   .get(infoExtraController.getTotalRegisteredCilindros)

router
   .route("/tintas/total-registered")
   .get(infoExtraController.getTotalRegisteredTintas)


// total de suprimentos retirados
router
   .route("/toners/total-withdrawn")
   .get(infoExtraController.getTotalRetiradasToners)

router
   .route("/cilindros/total-withdrawn")
   .get(infoExtraController.getTotalRetiradasCilindros)

router
   .route("/tintas/total-withdrawn")
   .get(infoExtraController.getTotalRetiradasTintas)


// suprimentos mais retirados
router
   .route("/toners/most-withdrawn")
   .get(infoExtraController.getMostRetiradaTonerOfTheMonth)

router
   .route("/cilindros/most-withdrawn")
   .get(infoExtraController.getMostRetiradaCilindroOfTheMonth)

router
   .route("/tintas/most-withdrawn")
   .get(infoExtraController.getMostRetiradaTintaOfTheMonth)


// total de suprimentos solicitados
router
   .route("/requests/total")
   .get(infoExtraController.getTotalAllRequested)

router
   .route("/toners/total-requested")
   .get(infoExtraController.getTotalRequestedToners)

router
   .route("/cilindros/total-requested")
   .get(infoExtraController.getTotalRequestedCilindros)

router
   .route("/tintas/total-requested")
   .get(infoExtraController.getTotalRequestedTintas)

// info de usuários
router
   .route("/users/total")
   .get(infoExtraController.getTotalUsers)

router
   .route("/users/active/total")
   .get(infoExtraController.getTotalActiveUsers)

module.exports = router;