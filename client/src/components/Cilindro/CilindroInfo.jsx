import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { useModal } from "../../Context/ModalContext";

export default function CilindroInfo() {
    const {setTitle} = useOutletContext();
    const {showModal} = useModal();

    //Definição de Título
    useEffect(() => {
        setTitle("Cilindros");
    }, [])

    return(
        <p>Conteúdo de Cilindro</p>

    )
}