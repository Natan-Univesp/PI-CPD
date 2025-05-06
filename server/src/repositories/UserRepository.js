const { where } = require("sequelize");
const { User } = require("../models");

async function findAllUsers() {
   const users = await User.findAll();
   return users;
}

async function findAllDefaultUsers() {
   const usersDefault = await User.findAll({where: {
      nivel_acesso: 2
   }})
   return usersDefault
}

async function findUserById(idUser) {
   const user = await User.findByPk(idUser);
   return user;
}

async function findUserNameAndAccessLevelById(idUser) {
   const user = await User.findByPk(idUser, {
      attributes: ["user", "nivel_acesso"]
   })
   return user;
}


async function findUserByName(userName) {
   const user = await User.findOne({where: {user: userName}});
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
      },
      returning: true,
      plain: true
   });
   return updatedUser;
}

module.exports = { 
   findAllUsers, 
   findAllDefaultUsers, 
   findUserById, 
   findUserNameAndAccessLevelById, 
   findUserByName, 
   createNewUser, 
   updateUserStatus 
}