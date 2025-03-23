import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";
import { useModal } from "../../Context/ModalContext";

//Componentes
import {SearchBar} from "../SearchBar/SearchBar";
import { FilterSupplyButton } from "../FilterSupplyButton/FilterSupplyButton";

export default function CilindroInfo() {
    const {setTitle} = useOutletContext();
    const {showModal} = useModal();

    //Definição de Título
    useEffect(() => {
        setTitle("Cilindros");
    }, [])

    return(
        <>
            <h2 className="subTitle">Consulta de Suprimentos</h2>
            <SearchBar/>
            <div>
                <FilterSupplyButton/>
                <FilterSupplyButton/>
                <FilterSupplyButton/>
            </div>
        </>

    )
}