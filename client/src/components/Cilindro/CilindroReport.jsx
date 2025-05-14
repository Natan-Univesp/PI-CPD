import { useEffect, useState } from "react";
import SupplyReport from "../Supply/SupplyReport";
import { useOutletContext } from "react-router-dom";
import {
   getAllRetiradasCilindrosByFilterService,
   getAllRetiradasCilindrosService,
} from "../../services/retiradaSupply.service";
import { Loading } from "../Loading/Loading";

export default function CilindroReport() {
   const { setTitle } = useOutletContext();
   const [retiradas, setRetiradas] = useState();
   const [filter, setFilter] = useState();
   const [isLoading, setIsLoading] = useState(true);

   const getAllCilindrosRetirados = async () => {
      try {
         const res = await getAllRetiradasCilindrosService();
         setRetiradas(res.data);
         setIsLoading(false);
      } catch (error) {
         console.log(error);
      }
   };

   const getAllCilindrosRetiradosByFilter = async () => {
      try {
         setIsLoading(true);
         const res = await getAllRetiradasCilindrosByFilterService(filter);
         setRetiradas(res.data);
         setIsLoading(false);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      setTitle("Relatório de Cilindros");
      getAllCilindrosRetirados();
   }, []);

   useEffect(() => {
      if (filter) {
         getAllCilindrosRetiradosByFilter(filter);
      }
   }, [filter]);

   if (isLoading) {
      return <Loading />;
   }

   return (
      retiradas && (
         <SupplyReport
            subTitle={"Cilindros Retirados"}
            supplyDataCollection={retiradas}
            filterParams={filter}
            setFilterParams={setFilter}
         />
      )
   );
}
