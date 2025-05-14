import React, { useEffect, useState } from "react";
import { useModal } from "../../../Context/ModalContext";
import styles from "./ModalConfirmSupplyRequest.module.css";
import { useAlert } from "../../../Context/AlertContext";
import { insertReqSuppliesService } from "../../../services/requestSupply.service";
import { useInfoExtra } from "../../../Context/InfoExtraContext";

export function ModalConfirmSupplyRequest() {
    const { showDataInfo, closeModal } = useModal();
    const { showSuccessAlert, showErrorAlert } = useAlert();
    const {
        solicitanteInfo, 
        supplies: suppliesRequest, 
        reset,
        setIsReseted
    } = showDataInfo();
    const { getAllHomePageStats } = useInfoExtra();

    const [supplies, setSupplies] = useState([]);

    const updateIncrementQtdSupply = (supplyCollection) => {
        if(supplyCollection.length > 0) {
            return(
                supplyCollection.reduce((acc, supplyData) => {
                    const repeatedSupplyData = acc.find(item => item.supply === supplyData.supply);
    
                    if(repeatedSupplyData) {
                        repeatedSupplyData.qtd += Number(supplyData.qtd);
                    
                    } else {
                        acc.push({...supplyData})
                    }
                    return acc;
    
                }, [])
            )
        }
        return []
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            await insertReqSuppliesService({...solicitanteInfo, supplies: supplies});
            showSuccessAlert({
                title: "Solicitação Cadastrada com Sucesso!",
                message: "Para visualizar a solicitação, acesse a aba 'Visualizar Solicitações'"
            });
            reset();
            setIsReseted(true);
            await getAllHomePageStats();
            closeModal();
        } catch (error) {
            showErrorAlert({
                title: "Erro ao cadastrar solicitação"
            })
            console.log(error);
        }

        
    }

    useEffect(() => {
        const newSupplies = updateIncrementQtdSupply(suppliesRequest);
        setSupplies(newSupplies);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        supplies.length > 0 &&
        <form className={"layoutFormContentSpacing"} onSubmit={handleOnSubmit}>
            <fieldset className={styles.resumeInfoContainer}>
                <legend>Informações do Solicitante</legend>
                <p>
                    <strong>Solicitante: </strong>
                    <span>{solicitanteInfo.solicitante}</span>
                </p>
                <p>
                    <strong>Setor: </strong>
                    <span>{solicitanteInfo.setor}</span>
                </p>
                <p>
                    <strong>Local: </strong>
                    <span>{solicitanteInfo.local}</span>
                </p>
            </fieldset>
            <fieldset className={styles.resumeInfoContainer}>
                <legend>Suprimentos Solicitados</legend>
                {supplies.map((item, index) => (
                    <React.Fragment key={index}>
                        <div className={styles.resumeInfoContent__supply}>
                            <p>
                                <strong>Modelo: </strong>
                                <span>{item.supply}</span>
                            </p>
                            <p>
                                <strong>Quantidade: </strong>
                                <span>{item.qtd}</span>
                            </p>
                        </div>
                        <hr className={styles.resumeInfoContent__spacing}/>
                    </React.Fragment>
                ))}
            </fieldset>

            <button className="buttonForm-style1">Concluir Cadastro</button>
        </form>
    );
}
