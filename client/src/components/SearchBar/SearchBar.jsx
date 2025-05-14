import { FaSearch } from "react-icons/fa";
import styles from "./SearchBar.module.css"; // Importe o CSS Module

export function SearchBar({ placeholder = "Pesquisar cilindros..." }) {
    return (
        <div className={styles.searchContainer}>
            <div className={styles.searchBar}>
                <input
                    type="text"
                    placeholder={placeholder}
                    className={styles.searchInput}
                />
                <button className={styles.searchButton}>
                    <FaSearch size={16} />
                </button>
            </div>
        </div>
    );
}