import PropTypes from "prop-types";
import { useState } from "react";
import styles from "./FilterSupplyButton.module.css";
import { FilterSupplyButtonContent } from "./FIlterSupplyButtonContent";

export function FilterSupplyButton({ handleGetAllSuppliesByMarca }) {
   const [selectedMarcaId, setSelectedMarcaId] = useState(0);

   return (
      <div className={styles.filterSupplyBtn__container}>
         <FilterSupplyButtonContent
            content={"ALL"}
            selectedMarcaId={selectedMarcaId}
            marcaId={0}
            handleOnClick={() => console.log("temp")}
         />
         <FilterSupplyButtonContent
            content={"HP"}
            selectedMarcaId={selectedMarcaId}
            marcaId={1}
            handleOnClick={() => console.log("temp")}
         />
         <FilterSupplyButtonContent
            content={"LEXMARK"}
            selectedMarcaId={selectedMarcaId}
            marcaId={2}
            handleOnClick={() => console.log("temp")}
         />
         <FilterSupplyButtonContent
            content={"HP"}
            selectedMarcaId={selectedMarcaId}
            marcaId={3}
            handleOnClick={() => console.log("temp")}
         />
      </div>
   );
}

FilterSupplyButton.propTypes = {
   handleGetAllSuppliesByMarca: PropTypes.func,
};
