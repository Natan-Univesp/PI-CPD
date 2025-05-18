import PropTypes from "prop-types";
import styles from "./FilterSupplyButton.module.css";

export function FilterSupplyButtonContent({ content, selectedMarcaId, marcaId, handleOnClick }) {
   return (
      <button
         className={`${styles.filterButton} ${selectedMarcaId === marcaId ? styles.active : ""}`}
         onClick={() => handleOnClick(marcaId)}
      >
         { content }
      </button>
   );
}

FilterSupplyButtonContent.propTypes = {
   content: PropTypes.string,
   selectedMarcaId: PropTypes.number,
   marcaId: PropTypes.number,
   handleOnClick: PropTypes.func,
};
