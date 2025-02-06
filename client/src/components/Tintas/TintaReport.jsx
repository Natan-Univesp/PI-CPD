import { useEffect } from "react";
import { useOutletContext } from "react-router-dom"

export default function TintaReport() {
    const {setTitle} = useOutletContext();


    useEffect(() => {
        setTitle("Relatório de Tintas");
    }, [])

    return(
        <p>Relatório de Tintas</p>
    )
}