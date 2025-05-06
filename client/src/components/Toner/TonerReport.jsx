import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

export default function TonerReport() {
    const { setTitle } = useOutletContext();

    //Definição de Título
    useEffect(() => {
        setTitle("Relatório de Toners");
    }, []);

    return (
        <>
          <h2 className="subTitle">Relatório de Toners</h2>
        </>
    );
}
