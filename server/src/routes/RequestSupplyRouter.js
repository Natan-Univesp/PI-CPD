const { Router } = require("express");
const reqSupplyController = require("../controllers/RequestSupplyController.js");

const router = Router();

router
   .route("/")
   .get(reqSupplyController.getAllReqSupply)
   .post(reqSupplyController.registerReqSupply)

router
   .route("/:id")
   .get(reqSupplyController.getReqSupplyById)

router
   .route("/suprimentos/:supplyId")
   .get(reqSupplyController.getReqSupplyItemById)
   .delete(reqSupplyController.removeReqSupplyItemById)


module.exports = router;