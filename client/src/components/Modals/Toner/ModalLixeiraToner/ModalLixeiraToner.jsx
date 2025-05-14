import { TableTrash } from "../../../Table/TableTrash/TableTrash";
import { Loading } from "../../../Loading/Loading";
import { useModal } from "../../../../Context/ModalContext";
import { useAlert } from "../../../../Context/AlertContext";
import { useToner } from "../../../../Context/TonerContext";
import { restoreTonerService } from "../../../../services/toner.service";
import { useInfoExtra } from "../../../../Context/InfoExtraContext";

export function ModalLixeiraToner() {
   const fieldNameCollection = ["ID", "Modelo", "Marca", "Data de Remoção"];
   const { showErrorAlert, showSuccessAlert } = useAlert();
   const { closeModal } = useModal();
   const { 
      trashToners, 
      getAllTrashToners, 
      getAllToners, 
      isTrashLoading 
   } = useToner();
   const { getAllTonerPageStats } = useInfoExtra();

   const handleRestoreToner = async (id) => {
      try {
         await restoreTonerService(id);
         showSuccessAlert({
            title: "Toner restaurado com sucesso!",
         });
         await getAllToners();
         await getAllTrashToners();
         await getAllTonerPageStats();
         closeModal();
      } catch (error) {
         console.log(error);
         if (error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao Restaurar Toner",
               message: errMessage,
            });
         }
      }
   };

   if (isTrashLoading) return <Loading />;

   return (
      trashToners && (
         <TableTrash
            fieldCollection={fieldNameCollection}
            dataCollection={trashToners}
            handleRestore={handleRestoreToner}
         />
      )
   );
}
