import PropTypes from "prop-types";

//Icones
import { FaArrowRotateLeft as IconRestore } from "react-icons/fa6";

import TableDefault from "../TableDefault/TableDefault";
import { getElementIdTable } from "../../../utils/ManipulateDataUtil";
import { useAlert } from "../../../Context/AlertContext";

export function TableTrash({fieldCollection = [], dataCollection = [], handleRestore}) {
    const { showConfirmAlert } = useAlert();

    const handleConfirmRestore = async (e) => {
        const id = getElementIdTable(e);
        await showConfirmAlert({
            title: "Restaurar Suprimento",
            message: "Você tem certeza que deseja restaurar o suprimento?",
            handleConfirm: async () => await handleRestore(id)
        })
    }

    const btnTableCollection = [
        {
            id: 1,
            infoView: <IconRestore/>,
            handleAction: handleConfirmRestore,
            className: "restoreBtn"
        }
    ]

    return(
        <TableDefault fieldCollection={fieldCollection} 
                      dataCollection={dataCollection} 
                      btnCollection={btnTableCollection}
                      isModalChildren={true}/>
    )
}

TableTrash.propTypes = {
    fieldCollection: PropTypes.array,
    dataCollection: PropTypes.array,
    handleRestore: PropTypes.func
}