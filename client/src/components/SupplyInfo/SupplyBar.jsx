import PropTypes from "prop-types";

//Componentes
import ContainerFilterBar from "../layout/ContainerFilterBar/ContainerFilterBar";
import ContainerFilterButton from "../layout/ContainerFilterButton/ContainerFilterButton";
import InputSearch from "../Input/InputSearch/InputSearch";

//Ícones
import { MdOutlineFilterAlt as IconOpenFilter, MdOutlineFilterAltOff as IconCloseFilter} from "react-icons/md";

//style 
import styles from "./SupplyInfo.module.css";


export default function SupplyBar({isFilterActive, handleChangeViewFilter, searchValue, setSearchValue}) {
    const updateSearchValue = (e) => {
        const value = e.target.value;
        setSearchValue(value);
    }

    return(
        <ContainerFilterBar>
            <InputSearch type={"text"} 
                         name={"searchSupply"} 
                         id={"searchSupply"} 
                         placeholder={"Buscar Suprimentos"}
                         value={searchValue}
                         handleOnChange={updateSearchValue}/>
            <ContainerFilterButton>
                <button className={isFilterActive ? styles.btnFilter__active : ""} onClick={handleChangeViewFilter}>
                    {!isFilterActive
                        ? (<><IconOpenFilter className={styles.iconBtn}/>Mostrar Filtros</>)
                        : (<><IconCloseFilter className={styles.iconBtn}/>Ocultar Filtros</>)
                    }
                </button>
            </ContainerFilterButton>
        </ContainerFilterBar>
    )
}

SupplyBar.propTypes = {
    isFilterActive: PropTypes.bool,
    handleChangeViewFilter: PropTypes.func,
    searchValue: PropTypes.string,
    setSearchValue: PropTypes.func
}