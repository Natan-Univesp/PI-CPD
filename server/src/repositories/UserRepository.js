const { where } = require("sequelize");
const { User, sequelize } = require("../models");

async function findAllUsers() {
   const users = await User.findAll();
   return users;
}

async function findAllDefaultUsers() {
   const usersDefault = await User.findAll({
      where: {
         nivel_acesso: 2
      },
      attributes: [
         "id",
         "user",
         "status",
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("user.created_at"), "%d-%m-%Y %H:%i:%s"),
            "created_at",
         ],
         [
            sequelize.fn("DATE_FORMAT", sequelize.col("user.updated_at"), "%d-%m-%Y %H:%i:%s"),
            "updated_at",
         ],
      ]
   })
   return usersDefault
}

async function findUserById(idUser) {
   const user = await User.findByPk(idUser);
   return user;
}

async function findUserLoggedInfoById(idUser) {
   const user = await User.findByPk(idUser, {
      attributes: ["user", "nivel_acesso", "status"]
   })
   return user;
}


async function findUserByName(userName) {
   const user = await User.findOne({
      where: {
         user: userName,
         status: "ativo"
      }
   });
   return user;
}

async function createNewUser(userInfo) {
   const createdUser = await User.create(userInfo);
   return createdUser;
}

async function updateUserStatus(idUser, newStatus) {
   const updatedUser = await User.update({ status: newStatus }, {
      where: {
         id: idUser
      }
   });
   return updatedUser;
}

async function findAndCountAllUsers() {
   const { count } = await User.findAndCountAll();
   return { total_users: count }
}

async function findAndCountAllActiveUsers() {
   const { count } = await User.findAndCountAll({
      where: {
         status: "ativo"
      }
   })
   return { total_users: count };
}

module.exports = { 
   findAllUsers, 
   findAllDefaultUsers, 
   findUserById, 
   findUserLoggedInfoById, 
   findUserByName, 
   createNewUser, 
   updateUserStatus,
   findAndCountAllUsers,
   findAndCountAllActiveUsers
}