import { useEffect, useState } from "react";
import { useModal } from "../../../../Context/ModalContext";
import { FormSupply } from "../../../Form/FormSupply/FormSupply";
import { useAlert } from "../../../../Context/AlertContext";
import { getTintaByIdService, updateTintaService } from "../../../../services/tinta.service";
import { useTinta } from "../../../../Context/TintaContext";

export function ModalEditTinta() {
   const { showDataInfo, closeModal } = useModal();
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { getAllTintas } = useTinta();
   const { id } = showDataInfo();
   const [editableTinta, setEditableTinta] = useState();

   const getTinta = async () => {
      try {
         const res = await getTintaByIdService(id);
         const { id: id_marca } = res.data.marca;
         const { modelo, printer_compat, qtd } = res.data;
         setEditableTinta({ modelo, id_marca, printer_compat, qtd });
      } catch (error) {
         console.log(error);
      }
   };

   const handleSubmitTinta = async (editedTintaData) => {
      try {
         const res = await updateTintaService(id, editedTintaData);
         showSuccessAlert({
            title: "Edição realizada com sucesso!",
            message: res.data.message,
         });
         await getAllTintas();
         closeModal();
      } catch (error) {
         console.log(error);
         if (error?.response?.data) {
            const { errMessage } = error.response.data;
            showErrorAlert({
               title: "Erro ao Editar Tinta",
               message: errMessage,
            });
         }
      }
   };

   useEffect(() => {
      getTinta();
   }, []);

   return (
      editableTinta && (
         <FormSupply
            supplyType="Tinta"
            dataSupply={editableTinta}
            handleSupplySubmit={handleSubmitTinta}
         />
      )
   );
}
