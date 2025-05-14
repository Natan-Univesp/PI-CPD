import { useAlert } from "../../../../Context/AlertContext";
import { useCilindro } from "../../../../Context/CilindroContext";
import { useInfoExtra } from "../../../../Context/InfoExtraContext";
import { useModal } from "../../../../Context/ModalContext";
import { createCilindroService } from "../../../../services/cilindro.service";
import { FormSupply } from "../../../Form/FormSupply/FormSupply";

export function ModalRegisterCilindro() {
   const { showErrorAlert, showSuccessAlert } = useAlert();
   const { closeModal } = useModal();
   const { getAllCilindros } = useCilindro();
   const { getAllCilindroPageStats } = useInfoExtra();

   const handleRegisterCilindro = async ({ modelo, id_marca, printer_compat, qtd }) => {
      if (!modelo || !id_marca || !printer_compat || !qtd) {
         console.log({ modelo, id_marca, printer_compat, qtd });
         return showErrorAlert({
            title: "Erro ao cadastrar Cilindro",
            message: "Um ou mais campos não foram devidamente preenchidos",
         });
      } else {
         try {
            const res = await createCilindroService({ modelo, id_marca, printer_compat, qtd });
            showSuccessAlert({
               title: "Cilindro cadastrado com sucesso!",
               message: res.data.message,
            });
            if (res.data) {
               await getAllCilindros();
               await getAllCilindroPageStats();
            }
            closeModal();
         } catch (error) {
            if (error?.response?.data) {
               const { code, errMessage } = error.response.data;

               if (code === "SUPPLY_EXISTS") {
                  showErrorAlert({
                     title: "Erro ao Cadastrar Cilindro",
                     message: errMessage,
                  });
               }
            }
         }
      }
   };

   return <FormSupply supplyType="Cilindro" handleSupplySubmit={handleRegisterCilindro} />;
}
