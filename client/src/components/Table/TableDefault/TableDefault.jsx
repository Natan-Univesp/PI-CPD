import PropTypes from "prop-types";

//Componentes
import THeadGeneral from "../TableComponents/THead/THeadGeneral";
import TBody from "../TableComponents/TBody/TBody";

//Ícones
import { FaEdit as IconEdit, FaTrashAlt as IconDel} from "react-icons/fa";
import { FaArrowRotateLeft as IconRestore, FaCheck as IconCheck} from "react-icons/fa6";


//Estilizações
import '../../../assets/css/Table.css';
import { useModal } from "../../../Context/ModalContext";

export default function TableDefault({title = "", fieldCollection = [], dataCollection = [], btnActionType = "", btnCollection = [], isModalChildren = false}) {

    const {defineModalParams} = useModal();

    const showModal = (modalNameRef, customStyleRef = {}) => {
        defineModalParams({isOpen: true, modalName: modalNameRef, customStyle: customStyleRef})
    }

    const btnTableData = {
        edit: [
            {
                id: 1,
                infoView: <IconEdit/>,
                handleAction: () => console.log("Isso é uma mensagem"),
                className: "editBtn"
            },
            {
                id: 2,
                infoView: <IconDel/>,
                handleAction: () => console.log("OS toners estão sendo deletados"),
                className: "delBtn"
            }
        ],
        trashRestore: [
            {
                id: 1,
                infoView: <IconRestore/>,
                handleAction: () => console.log("A informação foi restaurada"),
                className: "restoreBtn"
            }
        ],
        modifyOnly: [
            {
                id: 1,
                infoView: <IconEdit/>,
                handleAction: () => showModal("editPrinterModelRef", {maxHeight: "100%", overflow: "initial"}),
                className: "editBtn"
            },
        ],
        confirm: [
            {
                id: 1,
                infoView: <IconCheck/>,
                handleAction: () => console.log("Estou confirmando algo"),
                className: "acceptBtn"
            }
        ]
    }

    return(
        <>
            {dataCollection.length > 0 ?
                <div className={`tableContainer ${!isModalChildren ? "fadeIn" : ""}`}>
                    <table>
                        <thead>
                            <THeadGeneral title={title} fieldCollection={fieldCollection} hasActionBtn={btnCollection.length > 0}/>
                        </thead>
                        <tbody>
                            {dataCollection.map(data => <TBody key={data._id} 
                                                                dataInfo={data} 
                                                                btnInfoCollection={btnCollection}/>)}
                        </tbody>
                    </table>
                </div>

                : <p className="textInfoNotAvaliable">Dados não encontrados</p>
            }
        </>
    )
}

TableDefault.propTypes = {
    title: PropTypes.string,
    fieldCollection: PropTypes.array,
    dataCollection: PropTypes.array,
    btnActionType: PropTypes.string,
    btnCollection: PropTypes.array,
    isModalChildren: PropTypes.bool

}