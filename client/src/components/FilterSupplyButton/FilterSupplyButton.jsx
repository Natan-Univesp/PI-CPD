import styles from "./FilterSupplyButton.module.css";

export function FilterSupplyButton({ marca, active, onClick }) {
    return (
        <button 
            className={`${styles.filterButton} ${active ? styles.active : ''}`}
            onClick={onClick}
        >
            {marca}
        </button>
    );
}