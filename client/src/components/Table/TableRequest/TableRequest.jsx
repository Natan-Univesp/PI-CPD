import Proptypes from 'prop-types';
import '../../../assets/css/Table.css';

//Componentes de tabela
import THeadRequest from '../TableComponents/THead/THeadRequest';
import TBodyRequest from '../TableComponents/TBody/TBodyRequest';


export default function TableRequest({dataInfo}) {
    const fieldName = ["Modelo", "Marca", "Categoria", "Quantidade", "Status"];
    const dataRequest = {...dataInfo.solicitante, data_solicitacao: dataInfo.data_solicitacao};
    const dataSupply = dataInfo.suprimentos;

    return(
        <div className={"tableContainer fadeIn"}>
            <table>
                <thead>
                    <THeadRequest dataRequest={dataRequest} fieldName={fieldName} hasActionBtn={true}/>
                </thead>
                <tbody>
                    {dataSupply.map((supply, index) => <TBodyRequest key={index} dataInfo={supply}/>)}
                </tbody>
            </table>
        </div>
    )
}

TableRequest.propTypes = {
    dataInfo: Proptypes.object,
    children: Proptypes.elementType
}