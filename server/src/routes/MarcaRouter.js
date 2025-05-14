const { Router } = require("express");
const marcaController = require("../controllers/MarcaController.js");
const uploadAndMoveFile = require("../utils/MulterUtil.js");
const middlewareMulter = require("../middlewares/multerMiddleware.js");

const router = Router();

router
   .route("/")
   .get(marcaController.getAllMarcas)
   .post(uploadAndMoveFile.single("image"), marcaController.createMarca, middlewareMulter)

router
   .route("/select-options")
   .get(marcaController.getAllMarcasForSelect)

router
   .route("/toners/select-options")
   .get(marcaController.getAllMarcasWithTonersForSelect)

router
   .route("/cilindros/select-options")
   .get(marcaController.getAllMarcasWithCilindrosForSelect)

router
   .route("/tintas/select-options")
   .get(marcaController.getAllMarcasWithTintasForSelect)

router
   .route("/:id")
   .get(marcaController.getMarcaById)
   .patch(uploadAndMoveFile.single("image"), marcaController.updateMarca, middlewareMulter)

module.exports = router;