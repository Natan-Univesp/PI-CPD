import TableDefault from "../TableDefault/TableDefault";

//Como Utilizar Ícones
import { FaEdit as IconEdit } from "react-icons/fa";
import { FaTrash as IconDelete } from "react-icons/fa";

export function TableCilindroInfo() {
    const fieldNamecollection = ["Modelo", "Marca", "Impressoras Compatíveis", "Quantidade"];


    /* 
        O que é cada Coisa?
        id - número de identificação única
        infoView - o conteúdo que será exibido no botão. Pode ser um ícone ou também um Texto
        className - Estilização que será aplicada no botão. Pode ser visualizado no css da pasta ButtonTable. Mas basicamente temos "acceptBtn", "editBtn", "delBtn", "subBtn" e "restoreBtn"
    */
    const btnTableCollection = [
        {
            id: 1,
            infoView: <IconEdit/>,
            handleAction: (item) => console.log("editar", item),
            className: "editBtn" 
        },
        {
            id: 2,
            infoView: <IconDelete />,
            handleAction: (item) => console.log("Excluir", item),
            className: "delBtn"
        }
    ]; 

    // Para as próximas tabelas, se quiser, pode utilizar essa coleção como base
    const exDataCollection = [
        {
            id: 1,
            modelo: "ABC",
            marca: "ALFA",
            impressorasCompatíveis: "BETA",
            quantidade: 1,
            
        },
        {
            id: 2,
            modelo: "DEF",
            marca: "BETA",
            impressorasCompatíveis: "ALFA",
            quantidade: 1
        },
        {
            id: 3,
            modelo: "GHI",
            marca: "GAMA",
            impressorasCompatíveis: "ALFA",
            quantidade: 1 
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