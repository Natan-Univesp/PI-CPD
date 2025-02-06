import Proptypes from 'prop-types';
import '../../../assets/css/Table.css';

//Componentes de tabela
import THeadRequest from '../TableComponents/THead/THeadRequest';
import TBodyRequest from '../TableComponents/TBody/TBodyRequest';


export default function TableRequest({dataInfo}) {
    const fieldName = ["Modelo", "Marca", "Categoria", "Quantidade", "Status"];
    const dataRequest = {...dataInfo.solicitante, data_solicitacao: dataInfo.data_solicitacao};
    const dataSupply = dataInfo.suprimentos;

    /* 
    ===================================================
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
          Configuração de estilização customizada
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    ===================================================
    */
    const statusClassValidate = (status) => {
        let classStatus;
        switch(status) {
            case 1:
                classStatus = "success";
                break;
            case 2:
                classStatus = "unSuccessful";
                break;
            default:
                classStatus = "";
                break;
        }
        return classStatus;
    }

    const statusTextValidate = (status) => {
        let textStatus;
        switch (status) {
            case 1:
                textStatus = "Pronto para a retirada";
                break;
            case 2:
                textStatus = "Não Disponível no estoque";
                break;
            default:
                textStatus = "Desconhecido";
                break;
                
        }
        return textStatus;
    }

    const customInfo = {fieldName: "status",
                        classValidate: statusClassValidate,
                        valueValidate: statusTextValidate
                       }

    return(
        <div className={"tableContainer fadeIn"}>
            <table>
                <thead>
                    <THeadRequest dataRequest={dataRequest} fieldName={fieldName} hasActionBtn={true}/>
                </thead>
                <tbody>
                    {dataSupply.map((supply, index) => <TBodyRequest key={index} dataInfo={supply} customInfo={customInfo}/>)}
                </tbody>
            </table>
        </div>
    )
}

TableRequest.propTypes = {
    dataInfo: Proptypes.object,
    children: Proptypes.elementType
}