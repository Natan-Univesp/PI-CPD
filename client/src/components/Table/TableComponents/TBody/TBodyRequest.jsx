import PropTypes from "prop-types";
import TCell from "../TCell/TCell";
import ButtonTable from "../../ButtonTable/ButtonTable";

//Icones
import { FaTrash as IconReturn } from "react-icons/fa";

export default function TBodyRequest({ dataInfo }) {

    const handleSetStatusClass = (status) => {
        let statusClass;
        switch (status) {
            case "disponivel":
                statusClass = "success";
                break;
            case "indisponivel":
                statusClass = "unSuccessful";
                break;
            default:
                statusClass = "";
                break;
        }
        return statusClass;
    };

    const handleSetstatusText = (status) => {
        let statusText;
        switch (status) {
            case "disponivel":
                statusText = "Pronto para a retirada";
                break;
            case "indisponivel":
                statusText = "Não disponível no estoque";
                break;
            default:
                statusText = "Desconhecido";
                break;
        }
        return statusText;
    };

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
                if (key !== "_id" && key !== "id") {
                    return (
                        <TCell
                            key={index}
                            indexValue={index}
                            fieldName={key}
                            fieldValue={value}
                        />
                    );
                }
            })}
            <td className={"tableContent__btns"}>
                <ButtonTable
                    infoView={"Retirar Suprimento"}
                    classBtn={
                        dataInfo.status === "indisponivel" ? "inactiveBtn" : "acceptBtn"
                    }
                    handleAction={() => "Produto Retirado"}
                />
                <ButtonTable
                    infoView={<IconReturn />}
                    classBtn={"delBtn"}
                    handleAction={() => "Produto Retornado"}
                />
            </td>
        </tr>
    );
}

TBodyRequest.propTypes = {
    dataInfo: PropTypes.object,
};
