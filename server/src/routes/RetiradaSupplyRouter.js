const { Router } = require("express");
const retiradaController = require("../controllers/RetiradaSupplyController.js");

const router = Router();

router
   .route("/")
   .get(retiradaController.getAllRetiradas)
   .post(retiradaController.createRetirada)

router
   .route("/:id")
   .get(retiradaController.getRetiradaById)

router
   .route("/toners")
   .get(retiradaController.getAllRetiradasToner)

router
   .route("/cilindros")
   .get(retiradaController.getAllRetiradasCilindro)

router
   .route("/tintas")
   .get(retiradaController.getAllRetiradasTinta)

router
   .route("/filter")
   .get(retiradaController.getAllRetiradasByFilter)

module.exports = router;
