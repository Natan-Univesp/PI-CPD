import Proptypes from 'prop-types';
import '../../../assets/css/Table.css';

//Componentes de tabela
import THeadRequest from '../TableComponents/THead/THeadRequest';
import TBodyRequest from '../TableComponents/TBody/TBodyRequest';
import { useModal } from '../../../Context/ModalContext';
import { useSolicitacao } from '../../../Context/SolicitacaoContext';


export default function TableRequest({dataInfo}) {
    const { showModal } = useModal();
    const { getAllSolicitacoes } = useSolicitacao();
    const fieldName = ["ID", "Modelo", "Marca", "Categoria", "Quantidade", "Status"];
    const solicitacaoData = {
        solicitante: dataInfo.solicitante,
        setor: dataInfo.setor,
        local: dataInfo.local, 
        data_solicitacao: dataInfo.created_at
    };
    const dataSupply = dataInfo.request_itens;

    const handleOpenModal = () => {
        showModal({
            modalName: "confirmRetiradaSupply",
            data: {
                supplies: dataSupply,
                solicitacao: solicitacaoData,
                idRequest: dataInfo.id,
                getAllSolicitacoes
            }
        })
    }

    return(
        <div className={"tableContainer fadeIn"}>
            <table>
                <thead>
                    <THeadRequest dataRequest={solicitacaoData} fieldName={fieldName} handleOpenModal={handleOpenModal}/>
                </thead>
                <tbody>
                    {dataSupply.map((supply) => <TBodyRequest key={supply.id} dataInfo={supply} solicitacaoInfo={solicitacaoData}/>)}
                </tbody>
            </table>
        </div>
    )
}

TableRequest.propTypes = {
    dataInfo: Proptypes.object,
    children: Proptypes.elementType
}