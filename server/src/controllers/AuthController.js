const FieldUndefinedError = require("../classes/FieldUndefinedError");
const errorResponse = require("../helper/ErrorResponseHelper");
const { loginService } = require("../services/AuthServices");

async function login(req, res) {
   try {
      const { userName, password } = req.body;

      if(!userName || !password) {
         throw new FieldUndefinedError("Um ou mais campos não identificados", {
            fields: {
               userName,
               password
            }
         })
      }

      const loginInfo = await loginService(userName, password);

      return res.status(200).json(loginInfo);
      

   } catch (error) {
      errorResponse(error, res);
   }
}

module.exports = { login };