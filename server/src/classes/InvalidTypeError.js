const CustomError = require("./CustomError");

class InvalidTypeError extends CustomError {
   constructor(message, details = "") {
      super(message, 415, {
         code: "INVALID_TYPE_FILE",
         details
      })
   }
}

module.exports = InvalidTypeError;