import PropTypes from "prop-types";

//Componentes
import THeadGeneral from "../TableComponents/THead/THeadGeneral";
import TBody from "../TableComponents/TBody/TBody";


//Estilizações
import '../../../assets/css/Table.css';

export default function TableDefault({title = "", fieldCollection = [], dataCollection = [], btnCollection = [], fieldsExcludes = [], isModalChildren = false}) {

    return(
        <>
            {dataCollection.length > 0 ?
                <div className={`tableContainer ${!isModalChildren ? "fadeIn" : ""}`}>
                    <table>
                        <thead>
                            <THeadGeneral title={title} fieldCollection={fieldCollection} hasActionBtn={btnCollection.length > 0}/>
                        </thead>
                        <tbody>
                            {dataCollection.map(data => <TBody key={data.id} 
                                                                dataInfo={data} 
                                                                btnInfoCollection={btnCollection}
                                                                fieldsExcludes={fieldsExcludes}/>)}
                        </tbody>
                    </table>
                </div>

                : <p className="textInfoNotAvaliable textMargin">Dados não encontrados</p>
            }
        </>
    )
}

TableDefault.propTypes = {
    title: PropTypes.string,
    fieldCollection: PropTypes.array,
    dataCollection: PropTypes.array,
    btnCollection: PropTypes.array,
    fieldsExcludes: PropTypes.array,
    isModalChildren: PropTypes.bool

}