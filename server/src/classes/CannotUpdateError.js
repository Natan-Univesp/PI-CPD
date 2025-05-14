const CustomError = require("./CustomError");

class CannotUpdateError extends CustomError {
   constructor(message, details) {
      super(message, 500, {
         code: "CANNOT_UPDATE_DATA",
         details
      })
   }
}

module.exports = CannotUpdateError