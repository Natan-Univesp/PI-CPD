import { FilterBar } from "../../FilterBar/FilterBar";
import InputSearch from "../../Input/InputSearch/InputSearch";
import { TableReestoque } from "../../Table/TableReestoque/TableReestoque";

export function ModalReestoque() {
    const dataReestoque = [
        {
            id: 1,
            modelo: "D11",
            marca: "Samsung",
            qtd: 5
        },
        {
            id: 2,
            modelo: "TN580",
            marca: "Brother",
            qtd: 3
        },
        {
            id: 3,
            modelo: "D116",
            marca: "Samsung",
            qtd: 1
        }
    ]

    return(
        <>
            <InputSearch type={"text"} 
                         name={"searchSupply"} 
                         id={"searchSupply"}
                         placeholder={"Buscar Suprimentos"} 
                         customClass="modalLayout"/>
            <TableReestoque dataCollection={dataReestoque}/>
        </>
    )
}