import { useOutletContext } from "react-router-dom"
import { useEffect, useState } from "react";
import SupplyReport from "../Supply/SupplyReport";
import { getAllRetiradasTonersByFilterService, getAllRetiradasTonersService } from "../../services/retiradaSupply.service";
import { Loading } from "../Loading/Loading";

export default function TonerReport() {
    const {setTitle} = useOutletContext(); 
    const [retiradas, setRetiradas] = useState();
    const [filter, setFilter] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const getAllTonersRetirados = async () => {
      try {
        const res = await getAllRetiradasTonersService();
        setRetiradas(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    const getAllTonersRetiradasByFilter = async () => {
      try {
        setIsLoading(true);
        const res = await getAllRetiradasTonersByFilterService(filter);
        setRetiradas(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    //Definição de Título
    useEffect(() => {
      setTitle("Relatório de Toners");
      getAllTonersRetirados();
    }, [])

    useEffect(() => {
      if(filter) {
        getAllTonersRetiradasByFilter(filter);
      }
    }, [filter])

    if(isLoading) {
      return <Loading/>
    }

    return(
      retiradas &&
        <>
            <SupplyReport subTitle={"Toners Retirados"}
                          supplyDataCollection={retiradas}
                          filterParams={filter}
                          setFilterParams={setFilter}/>
        </>
    )
}