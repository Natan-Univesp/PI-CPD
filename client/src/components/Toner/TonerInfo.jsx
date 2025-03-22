import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { useModal } from "../../Context/ModalContext";



export default function TonerInfo() {
    const {setTitle} = useOutletContext();
    const { showModal } = useModal();

    //Definição de título
    useEffect(() => {
        setTitle("Toners");
        showModal({modalName: "registerToner", customStyle: {overflow: "initial"}})
    }, [])


    return(
        <>
            <h2 className="subTitle">SubTítulo de Toners</h2>
            <p>Aqui tem alguma coisa</p>
        </>

    )
}