const { Router } = require("express");
const tonerController = require("../controllers/TonerController.js");

const router = Router();

router
   .route("/")
   .get(tonerController.getAllToners)
   .post(tonerController.createToner)

router
   .route("/trash")
   .get(tonerController.getAllTrashToners)

router
   .route("/:id")
   .get(tonerController.getTonerById)
   .patch(tonerController.updateToner)

router
   .route("/marca/:marcaId")
   .get(tonerController.getAllTonersByMarca)

router
   .route("/:id/reestoque")
   .patch(tonerController.incrementToner)

router
   .route("/:id/trash")
   .patch(tonerController.changeSituacaoToner)

module.exports = router;