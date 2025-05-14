import { useForm } from "react-hook-form";
import { useAlert } from "../../../Context/AlertContext";
import { useModal } from "../../../Context/ModalContext";
import InputDefault from "../../Input/InputDefault/InputDefault";
import { registerNewUser } from "../../../services/admin.service";
import { useInfoExtra } from "../../../Context/InfoExtraContext";

export function ModalAddUser() {
   const { showConfirmAlert, showSuccessAlert, showErrorAlert } = useAlert();
   const { showDataInfo, closeModal } = useModal();
   const { getAllAdminPageStats } = useInfoExtra();
   const { getAllUsers } = showDataInfo();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ defaultValues: { userName: "", password: "" } });

   const registerUserName = register("userName", { required: "Campo Obrigatório!" });
   const registerPassword = register("password", { required: "Campo Obrigatório!" });

   const handleRegisterUser = async ({ userName, password }) => {
      if (!userName || !password) {
         return showErrorAlert({
            title: "Erro ao cadastrar Usuário",
            message: "Um ou mais campos não foram devidamente preenchidos",
         });
      }
      try {
         const res = await registerNewUser({ user: userName, password });
         showSuccessAlert({
            title: "Cadastro Concluído",
            message: "O usuário foi cadastrado com Sucesso.",
         });
         if (res.data) {
            await getAllUsers();
            await getAllAdminPageStats();
         }

         closeModal();
      } catch (error) {
        console.log(error);
        if(error?.response?.data) {
            const { errMessage } = error.response.data;
            showErrorAlert({
                title: "Erro ao Cadastrar Novo Usuário",
                message: errMessage
            })
        }
      }
   };

   const handleConfirmRegister = (data) => {
      showConfirmAlert({
         title: "Criação de Usuário",
         message: "Você está prestes a criar um novo Usuário. Está certo disso?",
         handleConfirm: () => handleRegisterUser(data),
      });
   };

   return (
      <form
         action=""
         className="layoutFormContentSpacing"
         onSubmit={handleSubmit(handleConfirmRegister)}
      >
         <InputDefault
            type="text"
            id="newUserName"
            placeholder="insira o nome de usuário..."
            textView="Usuário*"
            register={registerUserName}
            error={errors?.userName}
         />
         <InputDefault
            type="text"
            id="newUserPass"
            placeholder="Insira a senha de usuário..."
            textView="Senha*"
            register={registerPassword}
            error={errors?.password}
         />
         <button className="buttonForm-style1">Cadastrar</button>
      </form>
   );
}
