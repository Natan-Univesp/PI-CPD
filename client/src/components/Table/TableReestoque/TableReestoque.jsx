import PropTypes from "prop-types";
import THeadGeneral from "../TableComponents/THead/THeadGeneral";
import { TBodyReestoque } from "../TableComponents/TBody/TBodyReestoque";


export function TableReestoque({dataCollection = [], handleUpdateEstoque}) {
    const fieldCollection = ["Modelo", "Marca", "Qtd. Disponível", "Qtd. Recebida"];

    return(
        <>
            {dataCollection.length > 0 ?
                <div className="tableContainer">
                    <table>
                        <thead>
                            <THeadGeneral fieldCollection={fieldCollection} hasActionBtn={true}/>
                        </thead>
                        <tbody>
                            {dataCollection.map(data => (
                                <TBodyReestoque key={data.id} dataInfo={data} handleUpdateEstoque={handleUpdateEstoque}/>
                            ))}
                        </tbody>
                    </table>
                </div>
                : <p className="textInfoNotAvaliable">Dados não encontrados</p>
            }
        </>
    )
}

TableReestoque.propTypes = {
    dataCollection: PropTypes.array,
    handleUpdateEstoque: PropTypes.func
}