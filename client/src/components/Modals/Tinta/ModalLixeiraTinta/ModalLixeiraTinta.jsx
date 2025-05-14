import { useAlert } from "../../../../Context/AlertContext";
import { useInfoExtra } from "../../../../Context/InfoExtraContext";
import { useModal } from "../../../../Context/ModalContext";
import { useTinta } from "../../../../Context/TintaContext";
import { restoreTintaService } from "../../../../services/tinta.service";
import { Loading } from "../../../Loading/Loading";
import { TableTrash } from "../../../Table/TableTrash/TableTrash";

export function ModalLixeiraTinta() {
   const fieldNameCollection = ["ID", "Modelo", "Marca", "Data de Remoção"];
   const { showErrorAlert, showSuccessAlert } = useAlert();
   const { closeModal } = useModal();
   const {
      trashTintas,
      getAllTrashTintas,
      getAllTintas,
      isTrashLoading
   } = useTinta();
   const { getAllTintaPageStats } = useInfoExtra();

   const handleRestoreTinta = async (id) => {
      try {
         await restoreTintaService(id);
         showSuccessAlert({
            title: "Tinta restaurada com sucesso!",
         });
         await getAllTintas();
         await getAllTrashTintas();
         await getAllTintaPageStats();
         closeModal();
      } catch (error) {
         console.log(error);
         if (error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao Restaurar Tinta",
               message: errMessage,
            });
         }
      }
   };

   if(isTrashLoading) return <Loading/>;

   return(
      trashTintas &&
         <TableTrash 
            fieldCollection={fieldNameCollection}
            dataCollection={trashTintas}
            handleRestore={handleRestoreTinta}
         />
   )

}