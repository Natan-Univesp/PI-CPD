const { Router } = require("express");
const retiradaController = require("../controllers/RetiradaSupplyController.js");

const router = Router();

router
   .route("/")
   .get(retiradaController.getAllRetiradas)
   .post(retiradaController.createRetirada)

router
   .route("/toners")
   .get(retiradaController.getAllRetiradasToner)

router
   .route("/cilindros")
   .get(retiradaController.getAllRetiradasCilindro)

router
   .route("/tintas")
   .get(retiradaController.getAllRetiradasTinta)

//Suprimentos com filtragem
router
   .route("/toners/filter")
   .get(retiradaController.getAllRetiradasTonerByFilter)

router
   .route("/cilindros/filter")
   .get(retiradaController.getAllRetiradasCilindroByFilter)

router
   .route("/tintas/filter")
   .get(retiradaController.getAllRetiradasTintaByFilter)

router
   .route("/:id")
   .get(retiradaController.getRetiradaById)

module.exports = router;
