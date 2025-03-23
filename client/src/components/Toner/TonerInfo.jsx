import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { useModal } from "../../Context/ModalContext";



export default function TonerInfo() {
    const {setTitle} = useOutletContext();
    const { showModal } = useModal();

    /*
        Aqui será possível trabalhar com todos os formulários
        Vou deixar uma pequena lista de "modalName" e para qual formulário ela leva
        =============================
        registerToner - Formulário de Cadastro de Suprimentos
        registerUser - Formulário de Cadastro de Usuários
        registerMarca - Formulário de Cadastro de Marca
        =============================

        Para trocar a exibição de cada formulário 
        basta substituir o "registerToner" abaixo por um dos informados acima

    */

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