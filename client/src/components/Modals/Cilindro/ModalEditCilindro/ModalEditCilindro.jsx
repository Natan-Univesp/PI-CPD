import { useEffect, useState } from "react";
import { useModal } from "../../../../Context/ModalContext";
import { FormSupply } from "../../../Form/FormSupply/FormSupply";
import { useAlert } from "../../../../Context/AlertContext";
import {
   getCilindroByIdService,
   updateCilindroService,
} from "../../../../services/cilindro.service";
import { useCilindro } from "../../../../Context/CilindroContext";

export function ModalEditCilindro() {
   const { showDataInfo, closeModal } = useModal();
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { getAllCilindros } = useCilindro();
   const { id } = showDataInfo();
   const [editableCilindro, setEditableCilindro] = useState();

   const getCilindro = async () => {
      try {
         const res = await getCilindroByIdService(id);
         const { id: id_marca } = res.data.marca;
         const { modelo, printer_compat, qtd } = res.data;
         setEditableCilindro({ modelo, id_marca, printer_compat, qtd });
      } catch (error) {
         console.log(error);
      }
   };

   const handleSubmitCilindro = async (editedCilindroData) => {
      try {
         const res = await updateCilindroService(id, editedCilindroData);
         showSuccessAlert({
            title: "Edição realizada com sucesso!",
            message: res.data.message,
         });
         await getAllCilindros();
         closeModal();
      } catch (error) {
         console.log(error);
         if (error?.response?.data) {
            const { errMessage } = error.response.data;
            showErrorAlert({
               title: "Erro ao Editar Cilindro",
               message: errMessage,
            });
         }
      }
   };

   useEffect(() => {
      getCilindro();
   }, []);

   return (
      editableCilindro && (
         <FormSupply
            supplyType="Cilindro"
            dataSupply={editableCilindro}
            handleSupplySubmit={handleSubmitCilindro}
         />
      )
   );
}
