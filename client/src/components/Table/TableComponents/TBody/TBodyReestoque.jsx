import PropTypes from "prop-types";
import TCell from "../TCell/TCell";
import { TCellInput } from "../TCell/TCellInput";
import ButtonTable from "../../ButtonTable/ButtonTable";
import { useState } from "react";
import { FaCheck as IconConfirm } from "react-icons/fa6";
import { getElementIdTable } from "../../../../utils/ManipulateDataUtil";

export function TBodyReestoque({dataInfo, handleUpdateEstoque}) {
    const {modelo, marca, qtd} = dataInfo;
    const [valueReestoque, setValueReestoque] = useState();

    const editValueReestoque = (e) => {
        setValueReestoque(e.target.value);
    }

    const handleUpdate = async (e) => {
        const id = getElementIdTable(e);
        if(valueReestoque > 0) {
            await handleUpdateEstoque(id, Number(valueReestoque));
            setValueReestoque("");
        }
        
    }

    const buttonInfo = {
        id: 1,
        infoView: <IconConfirm/>,
        handleAction: handleUpdate,
        className: "acceptBtn"
    }

    return(
        <tr id={dataInfo.id}>
            <TCell indexValue={1} fieldValue={modelo}/>
            <TCell indexValue={2} fieldValue={marca}/>
            <TCell indexValue={3} fieldValue={qtd}/>
            <TCellInput inptType={"number"} inptId={dataInfo.id} inptName={"reestoqueQtd"} inptValue={valueReestoque} handleOnChange={editValueReestoque} customStyleInpt={{maxWidth: "100px"}}/>
            <td>
                <div className={"tableContent__btns"}>
                    <ButtonTable infoView={buttonInfo.infoView} 
                                    classBtn={(valueReestoque > 0) ? buttonInfo.className : "inactiveBtn"}
                                    handleAction={buttonInfo.handleAction}/>
                </div>
            </td>
        </tr> 
    )
}

TBodyReestoque.propTypes = {
    dataInfo: PropTypes.object,
    handleUpdateEstoque: PropTypes.func
}