import PropTypes from "prop-types";
import TCell from "../TCell/TCell";
import ButtonTable from "../../ButtonTable/ButtonTable";

//Icones
import { FaTrash as IconReturn } from "react-icons/fa";
import { useAlert } from "../../../../Context/AlertContext";
import { deleteSupplyRequestService } from "../../../../services/requestSupply.service";
import { useSolicitacao } from "../../../../Context/SolicitacaoContext";
import { useModal } from "../../../../Context/ModalContext";
import { useInfoExtra } from "../../../../Context/InfoExtraContext";

export default function TBodyRequest({ dataInfo, solicitacaoInfo }) {
    const { 
        showSuccessAlert, 
        showConfirmAlert, 
        showErrorAlert } = useAlert();
    const { showModal } = useModal(); 
    const { getAllSolicitacoes } = useSolicitacao();
    const { getAllHomePageStats } = useInfoExtra();

    const handleSetStatusClass = (statusRef) => {
        const status = statusRef.toUpperCase();
        let statusClass;
        switch (status) {
            case "DISPONIVEL":
                statusClass = "success";
                break;
            case "INDISPONIVEL":
                statusClass = "unSuccessful";
                break;
            default:
                statusClass = "";
                break;
        }
        return statusClass;
    };

    const handleSetstatusText = (statusRef) => {
        const status = statusRef.toUpperCase();
        let statusText;
        switch (status) {
            case "DISPONIVEL":
                statusText = "Pronto para a retirada";
                break;
            case "INDISPONIVEL":
                statusText = "Não disponível no estoque";
                break;
            default:
                statusText = "Desconhecido";
                break;
        }
        return statusText;
    };

    const deleteSupply = async (supplyId) => {
        try {
            const res = await deleteSupplyRequestService(supplyId);
            const { status } = res.data;
            if(status === "success") {
                showSuccessAlert({
                    title: "Solicitação de Suprimento deletada",
                })
                await getAllSolicitacoes();
                await getAllHomePageStats();
            }

        } catch (error) {
            console.log(error);
            if(error?.response?.data) {
                showErrorAlert({
                    title: "Erro ao deletar Suprimento",
                    
                })
            }
        }
    }

    const handleRetiradaSupply = () => {
        showModal({
            modalName: "confirmRetiradaSupply",
            data: {
                supplies: dataInfo ,
                solicitacao: solicitacaoInfo,
                getAllSolicitacoes
            }
        })
    }

    const handleConfirmDelete = async () => {
        const id = dataInfo.id;
        await showConfirmAlert({
            title: "Remover Suprimento Solicitado",
            message: "Você tem certeza que deseja remover o suprimento solicitado?",
            handleConfirm: async () => await deleteSupply(id)
        })
    }

    return (
        <tr id={dataInfo._id}>
            {Object.entries(dataInfo).map(([key, value], index) => {
                if (key === "status") {
                    return (
                        <td key={index}>
                            <p className={handleSetStatusClass(value)}>
                                {handleSetstatusText(value)}
                            </p>
                        </td>
                    );
                }
                return (
                    <TCell
                        key={index}
                        indexValue={index}
                        fieldValue={value}
                    />
                );
            })}
            <td className={"tableContent__btns"}>
                <ButtonTable
                    infoView={"Retirar Suprimento"}
                    classBtn={
                        dataInfo.status.toUpperCase() === "INDISPONIVEL" ? "inactiveBtn" : "acceptBtn"
                    }
                    handleAction={handleRetiradaSupply}
                />
                <ButtonTable
                    infoView={<IconReturn />}
                    classBtn={"delBtn"}
                    handleAction={handleConfirmDelete}
                />
            </td>
        </tr>
    );
}

TBodyRequest.propTypes = {
    dataInfo: PropTypes.object,
    solicitacaoInfo: PropTypes.object
};
