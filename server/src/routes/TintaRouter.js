const { Router } = require("express");
const tintaController = require("../controllers/TintaController.js");

const router = Router();

router
   .route("/")
   .get(tintaController.getAllTintas)
   .post(tintaController.createTinta)

router
   .route("/trash")
   .get(tintaController.getAllTrashTintas)

router
   .route("/:id")
   .get(tintaController.getTintaById)
   .patch(tintaController.updateTinta)

router
   .route("/marca/:marcaId")
   .get(tintaController.getAllTintasByMarca)

router
   .route("/:id/reestoque")
   .patch(tintaController.incrementTinta)

router
   .route("/:id/trash")
   .patch(tintaController.changeSituacaoTinta);

module.exports = router;