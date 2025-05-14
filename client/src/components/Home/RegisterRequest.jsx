import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import ContainerContent from "../layout/ContainerContent/ContainerContent.jsx";
import Calendario from "../Calendario/Calendario.jsx";
import FormCadastro from "./Form/FormCadastro.jsx";
import { Atalhos } from "../Atalhos/Atalhos.jsx";
import { CadastroReqProvider } from "../../Context/CadastroReqContext.jsx";

export default function RegisterRequest() {
    const {styles, setTitle} = useOutletContext();

    useEffect(() => {
        setTitle("Visão Geral");
    }, [])

    return(
        <div className={styles.mainContent}>
            <ContainerContent title={"Cadastro de Solicitações de Suprimentos"} classContainer={styles.formMain}>
                <CadastroReqProvider>
                    <FormCadastro/>
                </CadastroReqProvider>
            </ContainerContent>
            <ContainerContent title={"Calendário"} classContainer={styles.calendar}>
                <Calendario/>
            </ContainerContent>
            <ContainerContent title={"Atalhos para consulta"} classContainer={styles.quickShortCut}>
                <Atalhos/>
            </ContainerContent>
        </div>

    )
}