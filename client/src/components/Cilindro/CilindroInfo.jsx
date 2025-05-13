import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { useModal } from "../../Context/ModalContext";
import { FaFilter } from "react-icons/fa"; 

// Componentes 
import { SearchBar } from "../SearchBar/SearchBar";
import { FilterSupplyButton } from "../FilterSupplyButton/FilterSupplyButton";
import { TableCilindroInfo } from "../Table/TableCilindroInfo/TableCilindroInfo";

export default function CilindroInfo() {
    const { setTitle } = useOutletContext();
    const [activeFilter, setActiveFilter] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterButtonActive, setFilterButtonActive] = useState(false);

    const marcas = ["HP", "EPSON", "LEXMARK", "PANTUM", "CANON", "BROTHER"];

    useEffect(() => {
        setTitle("Cilindros");
    }, []);

    const handleFilterClick = (marca) => {
        setActiveFilter(activeFilter === marca ? null : marca);
    };

    const handleFilterButtonClick = () => {
        setFilterButtonActive(!filterButtonActive);
    };

    return (
        <>
            {/* Seção de status  */}
            <div style={statusContainer}>
                <div style={statusCard}>
                    <h3 style={statusTitle}>50</h3>
                    <p style={statusLabel}>Cilindros Disponíveis</p>
                </div>
                <div style={statusCard}>
                    <h3 style={statusTitle}>10</h3>
                    <p style={statusLabel}>Em Uso</p>
                </div>
            </div>

            {/* Título e barra de pesquisa */}
            <h2 className="subTitle">Consulta de Suprimentos</h2>

            <div style={searchContainer}>
                <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                <button 
                    onClick={handleFilterButtonClick}
                    style={{
                        ...filterToggleButton,
                        backgroundColor: filterButtonActive ? 'black' : 'white',
                        color: filterButtonActive ? 'white' : 'black',
                        borderColor: filterButtonActive ? 'black' : '#ddd'
                    }}
                >
                    <FaFilter style={{ marginRight: "0.5rem" }} />
                    Filtros
                </button>
            </div>
            
            {/* Seção de filtros por marca */}
            <div style={{ margin: "1rem 0" }}>
                <h3 style={sectionTitle}>Filtrar por Marca</h3>
                <div style={filtersContainer}>
                    {marcas.map((marca) => (
                        <FilterSupplyButton
                            key={marca}
                            marca={marca}
                            active={activeFilter === marca}
                            onClick={() => handleFilterClick(marca)}
                        />
                    ))}
                </div>
            </div>
            
            {/* Tabela */}
            <TableCilindroInfo filter={activeFilter} searchTerm={searchTerm} />
        </>
    );
}

// Estilos
const statusContainer = {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem"
};

const statusCard = {
    backgroundColor: "#f8f9fa",
    padding: "1rem",
    borderRadius: "8px",
    width: "150px",
    textAlign: "center"
};

const statusTitle = {
    fontSize: "1.8rem",
    margin: "0",
    color: "#333"
};

const statusLabel = {
    margin: "0",
    color: "#666"
};

const sectionTitle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    marginBottom: "1rem"
};

const searchContainer = {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    marginBottom: "1rem"
};

const filterToggleButton = {
    display: "flex",
    alignItems: "center",
    padding: "0.5rem 1rem",
    borderRadius: "4px",
    cursor: "pointer",
    whiteSpace: "nowrap",
    transition: "all 0.3s ease",
    fontSize: "0.9rem"
};

const filtersContainer = {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.5rem"
};




