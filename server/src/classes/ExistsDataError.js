const CustomError = require("./CustomError");


class ExistsDataError extends CustomError {
   constructor(message, codeRef = "", details = {}) {
      super(message, 409, {
         code: codeRef,
         details
      })
   }
}

module.exports = ExistsDataError;