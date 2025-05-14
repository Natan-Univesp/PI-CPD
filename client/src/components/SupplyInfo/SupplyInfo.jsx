import { useState } from "react";
import PropTypes from "prop-types";

//Componentes
import CardSupply from "../CardSupply/CardSupply";
import SupplyBar from "./SupplyBar";
import { TableSupply } from "../Table/TableSupply/TableSupply";

//style 
import styles from "./SupplyInfo.module.css";


//Ícones
import { PiListBullets as IconLayoutTable, PiSquaresFour as IconLayoutCard} from "react-icons/pi";
import { getElementIdTable } from "../../utils/ManipulateDataUtil";
import { FilterSupplyButton } from "../FilterSupplyButton/FilterSupplyButton";

export default function SupplyInfo({supplyCollection, handleEdit, handleDelete, searchValue, setSearchValue, handleGetAllSuppliesByMarca}) {
    const [isFilterActive, setIsFilterActive] = useState(false);
    const [modelViewSupply, setModelViewSupply] = useState("tableView");

    const handleEditTable = (e) => {
        const id = getElementIdTable(e);
        handleEdit(id);
    }


    const showHiddenFilter  = () => setIsFilterActive(prevValue => !prevValue);
    
    return(
        <div className={styles.supplyContainer}>
            <SupplyBar isFilterActive={isFilterActive} 
                       handleChangeViewFilter={showHiddenFilter}
                       searchValue={searchValue}
                       setSearchValue={setSearchValue}/>
            <div className="fadeOpacity" style={{display: !isFilterActive ? "none" : "initial"}}>
                <h3 className="textMargin">Filtragem por Marca</h3>
                <FilterSupplyButton handleGetAllSuppliesByMarca={handleGetAllSuppliesByMarca}/>
            </div>
            <div className={styles.supplyContent__layoutChange}>
                <div className={styles.layoutChange__item}>
                    <input type="radio" 
                           name="viewChange" 
                           id="tableView" 
                           value={"tableView"} 
                           checked={modelViewSupply === "tableView"}
                           onChange={e => setModelViewSupply(e.target.value)}/>
                    <label htmlFor="tableView">
                        <IconLayoutTable/>
                    </label>
                </div>
                <div className={styles.layoutChange__item}>
                    <input type="radio" 
                           name="viewChange" 
                           id="cardView" 
                           value={"cardView"} 
                           checked={modelViewSupply === "cardView"}
                           onChange={e => setModelViewSupply(e.target.value)}/>
                    <label htmlFor="cardView">
                        <IconLayoutCard/>
                    </label>
                </div>
                
                
            </div>
            {supplyCollection.length === 0 
                ? <p className="textInfoNotAvaliable textMargin">Nenhum dado Cadastrado</p>
                : modelViewSupply === "cardView" 
                    ? <div className={styles.supplyContent__collection}>
                        {supplyCollection.map(supply => <CardSupply key={supply.id} supply={supply} handleEdit={handleEdit} handleDelete={handleDelete}/>)}
                    </div> 
                    : <TableSupply dataCollection={supplyCollection} handleEdit={handleEditTable} handleDelete={handleDelete}/>
            }
            
        </div>
    )
}

SupplyInfo.propTypes = {
    supplyCollection: PropTypes.array,
    handleEdit: PropTypes.func,
    handleDelete: PropTypes.func,
    searchValue: PropTypes.string,
    setSearchValue: PropTypes.func,
    handleGetAllSuppliesByMarca: PropTypes.func
}