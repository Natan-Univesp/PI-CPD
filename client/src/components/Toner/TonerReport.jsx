import { useOutletContext } from "react-router-dom"
import { useEffect } from "react";

export default function TonerReport() {
    const {setTitle} = useOutletContext(); 

    //Definição de Título
    useEffect(() => {
      setTitle("Relatório de Toners");
    }, [])


    return(
        <p>Relatório de Toners</p>
    )
}