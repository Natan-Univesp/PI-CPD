import { useEffect, useState } from "react";
import { useModal } from "../../../../Context/ModalContext";
import { getAllTonersService, getTonerByIdService, updateTonerService } from "../../../../services/toner.service";
import { FormSupply } from "../../../Form/FormSupply/FormSupply";
import { useAlert } from "../../../../Context/AlertContext";
import { useToner } from "../../../../Context/TonerContext";

export function ModalEditToner() {
    const { showDataInfo, closeModal } = useModal();
    const { showSuccessAlert, showErrorAlert } = useAlert();
    const { getAllToners } = useToner();
    const { id } = showDataInfo();
    const [editableToner, setEditableToner] = useState();

    const getToner = async () => {
        try {
            const res = await getTonerByIdService(id);
            const { id: id_marca } = res.data.marca;
            const { modelo, printer_compat, qtd } = res.data;
            setEditableToner({modelo, id_marca, printer_compat, qtd});
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmitToner = async (editedTonerData) => {
        try {
            const res = await updateTonerService(id, editedTonerData);
            showSuccessAlert({
                title: "Edição realizada com sucesso!",
                message: res.data.message
            })
            await getAllToners();
            closeModal();
        } catch (error) {
            console.log(error);
            if(error?.response?.data) {
                const { errMessage } = error.response.data;
                showErrorAlert({
                    title: "Erro ao Editar Toner",
                    message: errMessage
                })
            }
        }
    };

    useEffect(() => {
        getToner()
    }, [])


    return(
        editableToner && <FormSupply supplyType="Toner" dataSupply={editableToner} handleSupplySubmit={handleSubmitToner}/>
    )
}