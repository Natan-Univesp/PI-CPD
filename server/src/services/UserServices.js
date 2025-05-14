const { hash } = require("bcrypt");
const {
   createNewUser,
   findAllUsers,
   findAllDefaultUsers,
   updateUserStatus,
   findUserById,
   findUserByName,
   findUserLoggedInfoById,
} = require("../repositories/UserRepository");
const ExistsDataError = require("../classes/ExistsDataError");
const NotFoundError = require("../classes/NotFoundError");
const { removeAllAcentsForString } = require("../utils/DataFormatUtil");

async function getAllUsersService() {
   const users = await findAllUsers();
   return users;
}

async function getAllDefaultUsersService() {
   const defaultUsers = await findAllDefaultUsers();
   return defaultUsers;
}

async function getUserByIdService(idUser) {
   const user = await findUserById(Number(idUser));
   return user;
}

async function getUserLoggedByIdService(idUser) {
   const user = await findUserLoggedInfoById(idUser);
   return user;
}

async function createUserService(userInfo) {
   const { user, password } = userInfo;
   const formattedUser = removeAllAcentsForString(user);
   const existsUser = await findUserByName(formattedUser);

   if(existsUser) {
      throw new ExistsDataError("Usuário já existe", "USER_EXISTS", {
         user_informado: formattedUser,
         user_existente: existsUser.user 
      })
   }

   const hashedPassword = await hash(password, 10);
   const createdUser = await createNewUser({
      user,
      password: hashedPassword,
      nivel_acesso: 2,
      status: "ativo",
   });
   return createdUser;
}

async function changeStatusUserService(idUser, newStatus) {
   const formattedStatus = newStatus.toLowerCase();
   const user = await getUserByIdService(idUser);

   if(!user) {
      throw new NotFoundError("Usuário não cadastrado!");
   }

   const currStatus = user.status.toLowerCase();

   if (formattedStatus !== "ativo" && formattedStatus !== "inativo") {
      throw new ExistsDataError("Status inexistente", "STATUS_UNKNOWN", {
         status_passado: newStatus,
         status_esperado: ["ativo", "inativo"],
      });
   }
   if (currStatus === formattedStatus) {
      throw new ExistsDataError(`O Usuário já está ${newStatus.toUpperCase()}`, "STATUS_EQUAL", {
         status_passado: newStatus,
         status_atual: currStatus,
      });
   }

   const updatedUser = await updateUserStatus(idUser, newStatus);
   return updatedUser;
}

module.exports = {
   getAllUsersService,
   getAllDefaultUsersService,
   getUserByIdService,
   getUserLoggedByIdService,
   createUserService,
   changeStatusUserService,
};
