import { FaUserPlus as IconAddUser } from "react-icons/fa";
import { useModal } from "../../Context/ModalContext";
import Action from "../Action/Action";
import { TableAdminUser } from "../Table/TableAdminUser/TableAdminUser";
import { Loading } from "../Loading/Loading";
import { useAdmin } from "../../Context/AdminContext";

export function AdminInfo() {
   const { showModal } = useModal();
   const {
    allUsers: users,
    isLoading,
    getAllUsers
   } = useAdmin();

   const actionList = [
      {
         id: 1,
         icon: <IconAddUser />,
         text: "Adicionar Usuário",
         placeholder: "ADICIONAR",
         handleOpenModal: () =>
            showModal({
               modalName: "adminAddUser",
               data: {
                  getAllUsers,
               },
            }),
      },
   ];

   return (
      <>
         <h2 className="subTitle">Ações</h2>
         <Action actionList={actionList} />
         <h2 className="subTitle">Todos os Usuários</h2>
         {isLoading ? <Loading /> : users && <TableAdminUser userCollection={users} />}
      </>
   );
}
