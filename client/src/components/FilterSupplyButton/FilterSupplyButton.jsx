import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./FilterSupplyButton.module.css";
import { FilterSupplyButtonContent } from "./FIlterSupplyButtonContent";
import { useMarca } from "../../Context/MarcaContext";
import { Loading } from "../Loading/Loading";

export function FilterSupplyButton({ handleGetAllSuppliesByMarca }) {
   const [selectedMarcaId, setSelectedMarcaId] = useState(0);
   const { marcas, isLoading } = useMarca();

   const getAllSuppliesByMarca = async (id) => {
      try {
         if(id !== selectedMarcaId) {
            setSelectedMarcaId(id);
            await handleGetAllSuppliesByMarca(id);
            
         }

      } catch (error) {
         console.log(error);
      }
   };

   if(isLoading) {
      return <Loading/>
   }

   return (
      <div className={styles.filterSupplyBtn__container}>
         <FilterSupplyButtonContent
            content={"ALL"}
            selectedMarcaId={selectedMarcaId}
            marcaId={0}
            handleOnClick={getAllSuppliesByMarca}
         />
         {marcas && 
            marcas.map((categInfo) => (
               <FilterSupplyButtonContent
                  key={categInfo.id}
                  content={categInfo.marca}
                  selectedMarcaId={selectedMarcaId}
                  marcaId={categInfo.id}
                  handleOnClick={getAllSuppliesByMarca}
               />
            ))
         }
      </div>
   );
}

FilterSupplyButton.propTypes = {
   handleGetAllSuppliesByMarca: PropTypes.func,
};
