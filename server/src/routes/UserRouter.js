const { Router } = require("express");
const userController = require("../controllers/UserController.js");

const router = Router();

router
   .route("/")
   .get(userController.getAllUsers)
   .post(userController.createUser);

router
   .route("/:id")
   .get(userController.getUserById)

router
   .route("/logged")
   .get(userController.getUserLoggedById)

router
   .route("/default-users")
   .get(userController.getAllDefaultUsers)

module.exports = router;