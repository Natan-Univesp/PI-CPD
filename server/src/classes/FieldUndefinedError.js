const CustomError = require("./CustomError");

class FieldUndefinedError extends CustomError {
   constructor(message, details) {
      super(message, 400, {
         code: "FIELD_UNDEFINED",
         details
      })
   }
}

module.exports = FieldUndefinedError