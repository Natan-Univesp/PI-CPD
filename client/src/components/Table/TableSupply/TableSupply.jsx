import PropTypes from "prop-types";

//Ícones
import { FaEdit as IconEdit, FaTrashAlt as IconDel} from "react-icons/fa";
import TableDefault from "../TableDefault/TableDefault";
import { useEffect, useState } from "react";
import { convertAllObjectValueOfArrayFromStringToArray, getElementIdTable } from "../../../utils/ManipulateDataUtil";
import { useAlert } from "../../../Context/AlertContext";

export function TableSupply({dataCollection = [], handleEdit, handleDelete}) {
    const { showConfirmAlert } = useAlert();
    const fieldNameCollection = ["ID", "Modelo", "Marca", "Impressoras Compatíveis", "Quantidade", "Modificado em"];
    const fieldsExcludes = ["img"];
    const [dataFormatted, setDataformatted] = useState([]);

    const handleConfirmDelete = async (e) => {
        const id = getElementIdTable(e);
        await showConfirmAlert({
            title: "Mover para a Lixeira",
            message: "Você tem certeza que deseja mover o Suprimento para a lixeira? (Esta ação poderá ser desfeita)",
            handleConfirm: async () => await handleDelete(id)
        })
    }

    const btnTableCollection = [
        {
            id: 1,
            infoView: <IconEdit/>,
            handleAction: handleEdit,
            className: "editBtn"
        },
        {
            id: 2,
            infoView: <IconDel/>,
            handleAction: handleConfirmDelete,
            className: "delBtn"
        }
    ]

    useEffect(() => {
        const newDataCollection = convertAllObjectValueOfArrayFromStringToArray(dataCollection, "printer_compat");
        setDataformatted(newDataCollection);
    }, [dataCollection])

    return(
            <TableDefault fieldCollection={fieldNameCollection} 
                          dataCollection={dataFormatted} 
                          btnCollection={btnTableCollection}
                          fieldsExcludes={fieldsExcludes}/>
    )
}

TableSupply.propTypes = {
    dataCollection: PropTypes.array,
    handleEdit: PropTypes.func,
    handleDelete: PropTypes.func
}