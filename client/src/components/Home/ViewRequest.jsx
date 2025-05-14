 import { useOutletContext } from "react-router-dom"
import TableRequest from "../Table/TableRequest/TableRequest";
import { useEffect } from "react";
import { Loading } from "../Loading/Loading";
import { useSolicitacao } from "../../Context/SolicitacaoContext";

export default function ViewRequest() {
    const { setTitle } = useOutletContext();
    const { solicitacoes, isLoading } = useSolicitacao();
    
    useEffect(() => {
        setTitle("Visualização de Solicitações");
    }, [])

    return(
        isLoading 
            ? <Loading/>
            : <>
                <h2 className="subTitle">Solicitações</h2>
                {solicitacoes.length > 0 
                ? solicitacoes.map((data) => <TableRequest dataInfo={data} key={data.id}/>)
                : <p className="textMargin textInfoNotAvaliable"> Nenhuma Solicitação Pendente </p>}
              </>
        
    )
}