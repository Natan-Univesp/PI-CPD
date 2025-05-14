import PropTypes from "prop-types";
import InputCheck from "../../../Input/InputCheck/InputCheck";
import { useState } from "react";
import { PassEye } from "../../../PassEye/PassEye";
import { useAlert } from "../../../../Context/AlertContext";
import { changeStatusUserService } from "../../../../services/admin.service";
import { useAdmin } from "../../../../Context/AdminContext";
import { useInfoExtra } from "../../../../Context/InfoExtraContext";

export function TBodyAdminUser({ userData }) {
   const { showConfirmAlert, showSuccessAlert, showErrorAlert } = useAlert();
   const { getAllUsers } = useAdmin();
   const { getAllAdminPageStats } = useInfoExtra();

   const handleChangeUserStatus = async () => {
      try {
         const newStatus = userData.status === "ativo" ? "inativo" : "ativo";
         const res = await changeStatusUserService(userData.id, newStatus);
         if (res?.data?.status === "success") {
            showSuccessAlert({
               title: "Alteração Concluída",
               message: "Status de usuário alterado com sucesso!",
            });
            await getAllUsers();
            await getAllAdminPageStats();
         }
         
      } catch (error) {
         console.log(error);
         if (error?.response?.data) {
            const { errMessage } = error.response.data;
            showErrorAlert({
               title: "Erro ao Alterar Status de Usuário",
               message: errMessage,
            });
         }
      }
   };

   const handleConfirmChangeStatus = async () => {
      showConfirmAlert({
         title: "Alteração de Status",
         message:
            "Você tem certeza que deseja Desativar o usuário? (Esta ação poderá ser desfeita)",
         handleConfirm: handleChangeUserStatus,
      });
   };

   return (
      <tr id={userData.id}>
         <td>
            <p>{userData.user}</p>
         </td>
         <td>
            <InputCheck
               name={`userStatus${userData.id}`}
               id={`userStatus${userData.id}`}
               checked={userData?.status === "ativo"}
               textView={userData?.status === "ativo" ? "ATIVO" : "INATIVO"}
               handleOnChange={handleConfirmChangeStatus}
            />
         </td>
         <td>
            <p>{userData.created_at}</p>
         </td>
         <td>
            <p>{userData.updated_at}</p>
         </td>
      </tr>
   );
}

TBodyAdminUser.propTypes = {
   userData: PropTypes.object,
};
