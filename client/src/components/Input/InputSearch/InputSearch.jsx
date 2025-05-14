import PropTypes from "prop-types";

import { FaSearch } from "react-icons/fa";
import styles from "./InputSearch.module.css"; // Importe o CSS Module

export default function InputSearch({
   type,
   name,
   id,
   placeholder,
   value = "",
   handleOnChange,
   customStyle = {},
   customClass = "",
}) {
   return (
      <div className={styles.searchContainer}>
         <div className={styles.searchBar}>
            <button className={styles.searchButton} disabled={true}>
               <FaSearch size={16} />
            </button>
            <input
               type={type}
               name={name}
               id={id}
               placeholder={placeholder}
               value={value}
               onChange={handleOnChange}
               className={styles.searchInput}
            />
         </div>
      </div>
   );
}

InputSearch.propTypes = {
   type: PropTypes.string,
   name: PropTypes.string,
   id: PropTypes.string,
   placeholder: PropTypes.string,
   value: PropTypes.string,
   handleOnChange: PropTypes.func,
   customStyle: PropTypes.object,
   customClass: PropTypes.string,
};
