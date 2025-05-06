const { Router } = require("express");
const cilindroController = require("../controllers/CilindroController.js");

const router = Router();

router
   .route("/")
   .get(cilindroController.getAllCilindros)
   .post(cilindroController.createCilindro)

router
   .route("/trash")
   .get(cilindroController.getAllTrashCilindros)

router
   .route("/:id")
   .get(cilindroController.getCilindroById)
   .patch(cilindroController.updateCilindro)

router
   .route("/marca/:marcaId")
   .get(cilindroController.getAllCilindrosByMarca)

router
   .route("/:id/reestoque")
   .patch(cilindroController.incrementCilindro)

router
   .route("/:id/trash")
   .patch(cilindroController.changeSituacaoCilindro)


module.exports = router;