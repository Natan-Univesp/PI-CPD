import { useEffect } from "react";
import { useOutletContext } from "react-router-dom"
import { useModal } from "../../Context/ModalContext";

export default function TintaInfo() {
    const {setTitle} = useOutletContext();
    const {showModal} = useModal();


    useEffect(() => {
        setTitle("Tintas");
    }, [])

    return(
        <p>Informações de Tintas</p>
    )
}