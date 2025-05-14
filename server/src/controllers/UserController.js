const {
   getAllUsersService,
   getAllDefaultUsersService,
   getUserByIdService,
   createUserService,
   changeStatusUserService,
   getUserLoggedByIdService,
} = require("../services/UserServices");
//Helpers
const errorResponse = require("../helper/ErrorResponseHelper");

// Erros customizados
const NotFoundError = require("../classes/NotFoundError");
const FieldUndefinedError = require("../classes/FieldUndefinedError");
const AccessLevelError = require("../classes/AccessLevelError");

async function getAllUsers(req, res) {
   try {
      const allUsers = await getAllUsersService();
      return res.status(200).json(allUsers);

   } catch (error) {
      errorResponse(error, res);

   }
}

async function getAllDefaultUsers(req, res) {
   try {
      const {nivel_acesso} = req.userInfo;
      
      if(nivel_acesso > 1) {
         throw new AccessLevelError("É necessário ser um Administrador para executar a ação", {
            fields: {
               nivel_acesso
            }
         })
      }

      const allDefaultUsers = await getAllDefaultUsersService();
      return res.status(200).json(allDefaultUsers);
      
   } catch (error) {
      errorResponse(error, res);
   }
}

async function getUserById(req, res) {
   try {
      const id = Number(req.params.id);

      if(!id) {
         throw new FieldUndefinedError("Campo ID não identificado");
      }

      const user = await getUserByIdService(id);
      if (!user) {
         throw new NotFoundError("Usuário não encontrado!");
      }
      return res.status(200).json(user);

   } catch (error) {
      errorResponse(error, res);

   }
}

async function getUserLoggedById(req, res) {
   try {
      const { id } = req.userInfo;

      if(!id) {
         throw new FieldUndefinedError("Campo ID não identificado");
      }

      const user = await getUserLoggedByIdService(id);
      if (!user) {
         throw new NotFoundError("Usuário não encontrado!");
      }
      return res.status(200).json(user);

   } catch (error) {
      errorResponse(error, res);

   }
}

async function createUser(req, res) {
   try {
      /*
      =============================================
              Verificação de nível de acesso
      =============================================
      */
      const { id } = req.userInfo;

      const existsUser = await getUserByIdService(id);

      if(!existsUser) {
         throw new NotFoundError("Usuário não encontrado", {
            fields: {
               id
            }
         })
      }

      const { nivel_acesso } = existsUser;
      
      if(nivel_acesso > 1) {
         throw new AccessLevelError("É necessário ser um Administrador para executar a ação", {
            fields: {
               nivel_acesso
            }
         })
      }

      /*
      =============================================
                     Cadastro efetivo
      =============================================
      */
      const { user, password } = req.body;

      if(!user || !password) {
         throw new FieldUndefinedError("Um ou mais campos não identificados", {
            fields: {
               user,
               password: password && "Senha encontrada"
            }
         })
      }

      const createdUser = await createUserService({ user, password });
      
      return res.status(201).json({
         status: "success",
         message: "Usuário cadastrado com sucesso!",
         data: createdUser
      });

   } catch (error) {
      errorResponse(error, res);
   }
}

async function changeStatusUser(req, res) {
   try {
      /*
      =============================================
              Verificação de nível de acesso
      =============================================
      */
      const { id } = req.userInfo;

      const existsUser = await getUserByIdService(id);

      if(!existsUser) {
         throw new NotFoundError("Usuário não encontrado", {
            fields: {
               id
            }
         })
      }

      const { nivel_acesso } = existsUser;
      
      if(nivel_acesso > 1) {
         throw new AccessLevelError("É necessário ser um Administrador para executar a ação", {
            fields: {
               nivel_acesso
            }
         })
      }

      /*
      =============================================
                     Edição efetiva
      =============================================
      */
      const idUser = Number(req.params.idUser);
      const { status } = req.body;

      if(!idUser || !status) {
         throw new FieldUndefinedError("Um ou mais campos não foram passados", {
            fields: {
               id: idUser,
               status
            }
         })
      }

      const [rowAffected] = await changeStatusUserService(idUser, status);

      if(rowAffected > 0) {
         return res.status(200).json({
            status: "success",
            message: "Status de usuário alterado com sucesso!",
         })
      }

   } catch (error) {
      errorResponse(error, res);
   }
}

module.exports = { 
   getAllUsers, 
   getAllDefaultUsers, 
   getUserById, 
   getUserLoggedById, 
   createUser, 
   changeStatusUser 
};
