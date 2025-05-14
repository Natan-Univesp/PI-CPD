import { useAlert } from "../../../../Context/AlertContext";
import { useModal } from "../../../../Context/ModalContext";
import { createMarcaService, getAllMarcasService } from "../../../../services/marca.service";
import { FormMarca } from "../../../Form/FormMarca/FormMarca";

export function ModalAddMarca() {
    const { showSuccessAlert } = useAlert();
    const { showDataInfo, closeModal } = useModal();
    const { setMarcas } = showDataInfo();

    const handleRegisterMarca = async ({img, marca}) => {
        try {
            const res = await createMarcaService({img, marca});
            showSuccessAlert({
                title: "Marca cadastrada com Sucesso!",
                message: res.data.message
            });
            if(res.data) {
                const newAllMarcas = await getAllMarcasService();
                setMarcas(newAllMarcas.data);
            }
            closeModal();
            
        } catch (error) {
            console.log(error);
        }
    }

    return(
        <FormMarca formAction={handleRegisterMarca}/>
    )
}