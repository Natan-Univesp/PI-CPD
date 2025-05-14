import { useAlert } from "../../../../Context/AlertContext";
import { useInfoExtra } from "../../../../Context/InfoExtraContext";
import { useModal } from "../../../../Context/ModalContext";
import { useToner } from "../../../../Context/TonerContext";
import { createTonerService } from "../../../../services/toner.service";
import { FormSupply } from "../../../Form/FormSupply/FormSupply";

export function ModalRegisterToner() {
    const { showErrorAlert, showSuccessAlert } = useAlert();
    const { closeModal } = useModal();
    const { getAllToners } = useToner();
    const { getAllTonerPageStats } = useInfoExtra();

    const handleRegisterToner = async ({modelo, id_marca, printer_compat, qtd}) => {
        if(!modelo || !id_marca || !printer_compat || !qtd) {
            console.log({modelo, id_marca, printer_compat, qtd})
            return showErrorAlert({
                title: "Erro ao cadastrar Toner",
                message: "Um ou mais campos não foram devidamente preenchidos"
            })
        } else {
            try {
                const res = await createTonerService({modelo, id_marca, printer_compat, qtd});
                showSuccessAlert({
                    title: "Toner cadastrado com sucesso!",
                    message: res.data.message
                })
                if(res.data) {
                    await getAllToners();
                    await getAllTonerPageStats();

                }
                closeModal();
            } catch (error) {
                if(error?.response?.data) {
                    const { code, errMessage } = error.response.data;

                    if(code === "SUPPLY_EXISTS") {
                        showErrorAlert({
                            title: "Erro ao Cadastrar Toner",
                        message: errMessage
                        })
                    }
                }
            }
        }
        
    }

    return(
        <FormSupply supplyType="Toner" handleSupplySubmit={handleRegisterToner}/>
    )
}