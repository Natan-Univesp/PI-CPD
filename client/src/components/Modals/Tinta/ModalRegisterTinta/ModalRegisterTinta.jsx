import { useAlert } from "../../../../Context/AlertContext";
import { useInfoExtra } from "../../../../Context/InfoExtraContext";
import { useModal } from "../../../../Context/ModalContext";
import { useTinta } from "../../../../Context/TintaContext";
import { createTintaService } from "../../../../services/tinta.service";
import { FormSupply } from "../../../Form/FormSupply/FormSupply";

export function ModalRegisterTinta() {
   const { showErrorAlert, showSuccessAlert } = useAlert();
   const { closeModal } = useModal();
   const { getAllTintas } = useTinta();
   const { getAllTintaPageStats } = useInfoExtra();

   const handleRegisterTinta = async ({ modelo, id_marca, printer_compat, qtd }) => {
      if (!modelo || !id_marca || !printer_compat || !qtd) {
         console.log({ modelo, id_marca, printer_compat, qtd });
         return showErrorAlert({
            title: "Erro ao cadastrar Tinta",
            message: "Um ou mais campos não foram devidamente preenchidos",
         });
      } else {
         try {
            const res = await createTintaService({ modelo, id_marca, printer_compat, qtd });
            showSuccessAlert({
               title: "Tinta cadastrada com sucesso!",
               message: res.data.message,
            });
            if (res.data) {
               await getAllTintas();
               await getAllTintaPageStats();
            }
            closeModal();
         } catch (error) {
            if (error?.response?.data) {
               const { code, errMessage } = error.response.data;

               if (code === "SUPPLY_EXISTS") {
                  showErrorAlert({
                     title: "Erro ao Cadastrar Tinta",
                     message: errMessage,
                  });
               }
            }
         }
      }
   };

   return <FormSupply supplyType="Tinta" handleSupplySubmit={handleRegisterTinta}/>;
}
