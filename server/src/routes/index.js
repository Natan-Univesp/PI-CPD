const { Router, static } = require("express");
const path = require("path");
const authRouter = require("./AuthRouter.js");
const userRouter = require("./UserRouter.js");
const marcaRouter = require("./MarcaRouter.js");
const tonerRouter = require("./TonerRouter.js");
const tintaRouter = require("./TintaRouter.js");
const cilindroRouter = require("./CilindroRouter.js");
const requestSupplyRouter = require("./RequestSupplyRouter.js");
const retiradaSupplyRouter = require("./RetiradaSupplyRouter.js");
const infoExtraRouter = require("./InfoExtraRouter.js");
const authMiddleware = require("../middlewares/authMiddleware.js");

const router = Router();

router.use("/auth", authRouter);
router.use("/users", authMiddleware, userRouter);
router.use("/marcas", authMiddleware, marcaRouter);
router.use("/toners", authMiddleware, tonerRouter);
router.use("/tintas", authMiddleware, tintaRouter);
router.use("/cilindros", authMiddleware, cilindroRouter);
router.use("/solicitacoes", authMiddleware, requestSupplyRouter);
router.use("/retiradas", authMiddleware, retiradaSupplyRouter);
router.use("/infos-extras", authMiddleware, infoExtraRouter)


module.exports = router;