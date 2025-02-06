import { useEffect } from "react"
import { useOutletContext } from "react-router-dom";

export default function CilindroReport() {
    const {setTitle} = useOutletContext();

    useEffect(() => {
      setTitle("Relatório de Cilindros");
    },[])

    return(
      <p>Área de relatório de conteúdo</p>
    )
}