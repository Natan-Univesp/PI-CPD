import PropTypes from "prop-types";
import Action from "../Action/Action";
import SupplyInfo from "../SupplyInfo/SupplyInfo";
import { Loading } from "../Loading/Loading";

export default function SupplyMain({subTitle, actionData = [], supplyInfo = {}}) {

    return(
        <>
            <h2 className="subTitle">Ações</h2>
            {actionData.length > 0 
                ? <Action actionList={actionData}/>
                : <p className="textMargin textInfoNotAvaliable">
                    Dados de Ações não informados
                  </p>
            }

            <h2 className="subTitle">{subTitle}</h2>
            {Object.keys(supplyInfo).length === 0
                ? <p className="textMargin textInfoNotAvaliable">Dados de Suprimento(s) não informados</p>
                : supplyInfo.isLoading
                    ? <Loading/>
                    : <SupplyInfo supplyCollection={supplyInfo.data}
                                  handleEdit={supplyInfo.handleEdit}
                                  handleDelete={supplyInfo.handleDelete}
                                  searchValue={supplyInfo.searchValue}
                                  setSearchValue={supplyInfo.setSearchValue}
                                  handleGetAllSuppliesByMarca={supplyInfo.getAllSuppliesByMarca}/>
            }
        </>
    )
}

SupplyMain.propTypes = {
    subTitle: PropTypes.string,
    actionData: PropTypes.array,
    supplyInfo: PropTypes.object
}