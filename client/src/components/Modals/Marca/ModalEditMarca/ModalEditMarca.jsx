import { useEffect, useState } from "react";
import { useModal } from "../../../../Context/ModalContext";
import { FormMarca } from "../../../Form/FormMarca/FormMarca";
import { getAllMarcasService, getMarcaByIdService, updateMarcaService } from "../../../../services/marca.service";
import { useAlert } from "../../../../Context/AlertContext";

export function ModalEditMarca() {
    const { showDataInfo, closeModal } = useModal();
    const { showSuccessAlert } = useAlert();
    const { id, setMarcas } = showDataInfo();
    const [editableMarca, setEditableMarca] = useState();
    const serverImage = import.meta.env.VITE_SERVER_UPLOADS;

    const getMarca = async () => {
        try {
            const res = await getMarcaByIdService(id);
            let { marca, img } = res.data;
            img = `${serverImage}/${img}`;
            setEditableMarca({id, marca, img});
        } catch (error) {
            console.log(error);
        }
    }

    const handleEditMarca = async (editedMarca) => {
        try {
            const res = await updateMarcaService(id, editedMarca);
            showSuccessAlert({
                title: "Sucesso!",
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

    useEffect(() => {
        getMarca();
    }, []);

    return(
        editableMarca && <FormMarca formAction={handleEditMarca} dataMarca={editableMarca}/>
    )
}