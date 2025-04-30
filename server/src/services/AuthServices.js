const NotFoundError = require("../classes/NotFoundError");
const { findUserByName } = require("../repositories/UserRepository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

function generateToken(id) {
   return jwt.sign({id: id}, process.env.SECRET_TOKEN, {expiresIn: 86400});
}


async function loginService(userName, password) {
   const existsUser = await findUserByName(userName.toLowerCase());

   if(!existsUser) {
      throw new NotFoundError("Usuário não encontrado", {
         status: "error",
         message: "Usuário incorreto ou não existe",
      })
   }

   const { id, user, nivel_acesso } = existsUser;

   const isValidPassword = await bcrypt.compare(password, existsUser.password);

   if(!isValidPassword) {
      throw new NotFoundError("Senha incorreta", {
         status: "error",
         message: "Senha incorreta ou usuário não existe"
      })
   }

   const token = generateToken(id);

   return {
      token,
      user,
      nivel_acesso
   };
}

module.exports = { loginService };