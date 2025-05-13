import TableDefault from "../TableDefault/TableDefault";

import { FaTrash as IconDelete } from "react-icons/fa";

export function () {
    const fieldNamecollection = ["Modelo", "Marca", "Tipo", "Data de Remoção"];


    /* 
        O que é cada Coisa?
        id - número de identificação única
        infoView - o conteúdo que será exibido no botão. Pode ser um ícone ou também um Texto
        className - Estilização que será aplicada no botão. Pode ser visualizado no css da pasta ButtonTable. Mas basicamente temos "acceptBtn", "editBtn", "delBtn", "subBtn" e "restoreBtn"
    */
    const btnTableCollection = [
        {
            id: 1,
        infoView: <IconDelete />,
        handleAction: (item) => console.log("Remover da Lixeira", item),
        className: "delBtn"
        }
    ]; 

    // Para as próximas tabelas, se quiser, pode utilizar essa coleção como base
    const exDataCollection = [
        {
            id: 1,
            modelo: "ABC",
            marca: "ALFA",
            tipo: "BETA",
            dataDeRemoção: "01/01/2025",
            
        },
        {
            id: 2,
            modelo: "DEF",
            marca: "BETA",
            tipo: "ALFA",
            dataDeRemoção: "01/01/2025",
        },
        {
            id: 3,
            modelo: "GHI",
            marca: "GAMA",
            tipo: "ALFA",
            dataDeRemoção: "01/01205", 
        }
    ]; 

    /* 
        Explicando cada informação da Table:
        - fieldCollection: Nome das colunas da tabela
        - dataCollection: as "linhas" da tabela (basicamente todo o conteúdo em si)
        - btnCollection: os botões que serão utilizados na tabela (vai editar? vai excluir?)
    */

    return(
        <TableDefault fieldCollection={fieldNamecollection}
        dataCollection={exDataCollection}
        btnCollection={btnTableCollection}/>
    )
}