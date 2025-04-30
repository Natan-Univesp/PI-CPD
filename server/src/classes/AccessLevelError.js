const CustomError = require("./CustomError");

class AccessLevelError extends CustomError {
   constructor(message, details = "") {
      super(message, 401, {
         code: "ACCESS_DENIED",
         details
      })
   }
}

module.exports = AccessLevelError;