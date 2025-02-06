import { useOutletContext } from "react-router-dom"
import TableRequest from "../Table/TableRequest/TableRequest";
import { useEffect } from "react";

export default function ViewRequest() {
    const { setTitle } = useOutletContext();

    /* 
        |       Tabela de status        |
        ---------------------------------               
        |   1 = Pronto para retirada    |
        | 2 = Não disponível no estoque |
    */
    const info = [{_id: 1, 
                   solicitante: {
                    nome_solicitante: "Claudia Guiné Ranete",
                    setor: "Saúde",
                    local: "Jardim América"
                   },
                   suprimentos: [
                        {_id: 1, modelo: "TN580", marca: "Brother", categoria: "Toner", qtd: 1, status: 1},
                        {_id: 2, modelo: "D111", marca: "Samsung", categoria: "Toner", qtd: 1, status: 2}
                   ],
                   data_solicitacao: "12-10-2024"
                },
                {_id: 2, 
                    solicitante: {
                     nome_solicitante: "Juliana Silveira Goya",
                     setor: "Educação",
                     local: "Secretária da Educação"
                    },
                    suprimentos: [
                         {_id: 1, modelo: "DR620", marca: "Brother", categoria: "Cilindro", qtd: 1, status: 1},
                         {_id: 2, modelo: "D111", marca: "Samsung", categoria: "Toner", qtd: 1, status: 1}
                    ],
                    data_solicitacao: "20-10-2024"
                 }
                ]
    
    useEffect(() => {
        setTitle("Visualização de Solicitações");
    }, [])

    return(
        <>
            <h2 className="subTitle">Solicitações</h2>
            {info.length > 0 
            ? info.map((data, index) => <TableRequest dataInfo={data} key={index}/>)
            : <p className="textMargin textInfoNotAvaliable"> Nenhuma Solicitação Pendente </p>}
        </>
    )
}