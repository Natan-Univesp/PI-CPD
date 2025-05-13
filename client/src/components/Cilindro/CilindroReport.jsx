import { useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";

// Componentes
import { SearchBar } from "../SearchBar/SearchBar";
import { TableCilindroReport } from "../Table/TableCilindroReport/TableCilindroReport";

export default function CilindroReport() { 
    const { setTitle } = useOutletContext();
    const [searchTerm, setSearchTerm] = useState("");
    const [filterButtonActive, setFilterButtonActive] = useState(false);

    useEffect(() => {
        setTitle("Relatório de Cilindros");
    }, []);

    const handleFilterButtonClick = () => {
        setFilterButtonActive(!filterButtonActive);
        // Lógica de filtros específica para o relatório
    };

    return (
        <>
            <h2 className="subTitle">Consulta de Retirada de Cilindros</h2>
            
            <div style={searchContainer}>
                <SearchBar 
                    value={searchTerm} 
                    onChange={(e) => setSearchTerm(e.target.value)} 
                    placeholder="Pesquisar cilindros..."
                />
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
            
            <TableCilindroReport searchTerm={searchTerm} />
        </>
    );
}

// Estilos (copiados do CilindroInfo para manter consistência)
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