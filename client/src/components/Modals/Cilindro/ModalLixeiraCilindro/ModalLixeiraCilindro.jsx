import { useAlert } from "../../../../Context/AlertContext";
import { useCilindro } from "../../../../Context/CilindroContext";
import { useInfoExtra } from "../../../../Context/InfoExtraContext";
import { useModal } from "../../../../Context/ModalContext";
import { restoreCilindroService } from "../../../../services/cilindro.service";
import { Loading } from "../../../Loading/Loading";
import { TableTrash } from "../../../Table/TableTrash/TableTrash";

export function ModalLixeiraCilindro() {
   const fieldNameCollection = ["ID", "Modelo", "Marca", "Data de Remoção"];
   const { showErrorAlert, showSuccessAlert } = useAlert();
   const { closeModal } = useModal();
   const {
      trashCilindros,
      getAllTrashCilindros,
      getAllCilindros,
      isTrashLoading
   } = useCilindro();
   const { getAllCilindroPageStats } = useInfoExtra();

   const handleRestoreCilindro = async (id) => {
      try {
         await restoreCilindroService(id);
         showSuccessAlert({
            title: "Cilindro restaurado com sucesso!"
         })
         await getAllCilindros();
         await getAllTrashCilindros();
         await getAllCilindroPageStats();
         closeModal();
         
      } catch (error) {
         console.log(error);
         if(error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao Restaurar Cilindro",
               message: errMessage
            })
               
         }
      }
   }

   if(isTrashLoading) return <Loading/>

   return(
      trashCilindros && 
         <TableTrash fieldCollection={fieldNameCollection} 
                     dataCollection={trashCilindros} 
                     handleRestore={handleRestoreCilindro}/>
   )

}