import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import ContainerContent from "../layout/ContainerContent.jsx";
import Calendario from "../Calendario/Calendario.jsx";
import FormCadastro from "./Form/FormCadastro.jsx";

export default function RegisterRequest() {
    const {styles, setTitle} = useOutletContext();

    useEffect(() => {
        setTitle("Visão Geral");
    }, [])

    return(
        <div className={styles.mainContent}>
            <ContainerContent title={"Cadastro de Solicitações de Suprimentos"} content={<FormCadastro/>} classContainer={styles.formMain}/>
            <ContainerContent title={"Calendário"} content={<Calendario/>} classContainer={styles.calendar}/>
            <ContainerContent title={"Atalhos"} content={<p>Atalhos!</p>} classContainer={styles.quickShortCut}/>
        </div>

    )
}