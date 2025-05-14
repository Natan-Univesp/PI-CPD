import PropTypes from "prop-types";
import InputSearch from "../Input/InputSearch/InputSearch";
import ContainerFilterButton from "../layout/ContainerFilterButton/ContainerFilterButton";
import { MdOutlineFilterAlt as IconOpenFilter} from "react-icons/md";
import ContainerFilterBar from "../layout/ContainerFilterBar/ContainerFilterBar";

export function FilterBar({hasFilterButton = false, searchValue, setSearchValue, handleOpenFilter}) {
   const updateSearchValue = (e) => {
      const value = e.target.value;
      setSearchValue(value);
   };

   return(
      <ContainerFilterBar>
         <InputSearch
            type={"text"}
            name={"searchTable"}
            id={"searchTable"}
            placeholder={"Buscar registros"}
            value={searchValue}
            handleOnChange={updateSearchValue}
         />
         {hasFilterButton && (
            <ContainerFilterButton>
               <button onClick={handleOpenFilter}>
                  <>
                     <IconOpenFilter /> Filtrar e organizar 
                  </>
               </button>
            </ContainerFilterButton>
         )}
      </ContainerFilterBar>
   )
}

FilterBar.propTypes = {
   hasFilterButton: PropTypes.bool,
   searchValue: PropTypes.string,
   setSearchValue: PropTypes.func,
   handleOpenFilter: PropTypes.func,
};
