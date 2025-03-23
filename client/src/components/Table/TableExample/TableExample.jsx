import TableDefault from "../TableDefault/TableDefault";

//Como Utilizar Ícones
import { FaEdit as IconEdit } from "react-icons/fa";

export function TableExample() {
    const fieldNamecollection = ["Coluna 1", "Coluna 2"];


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
            handleAction: () => console.log("Aqui vai uma função. Pode deixar assim para os outros"),
            className: "acceptBtn" 
        }
    ]

    // Para as próximas tabelas, se quiser, pode utilizar essa coleção como base
    const exDataCollection = [
        {
            id: 1,
            nome: "Claudio",
            sobrenome: "Pereira"
        },
        {
            id: 2,
            nome: "Marcus Vinicius",
            sobrenome: "Rodrigues"
        }
    ]

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