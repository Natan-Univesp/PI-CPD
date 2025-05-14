import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import SupplyReport from "../Supply/SupplyReport";
import {
   getAllRetiradasTintasByFilterService,
   getAllRetiradasTintasService,
} from "../../services/retiradaSupply.service";
import { Loading } from "../Loading/Loading";

export default function TintaReport() {
   const { setTitle } = useOutletContext();
   const [retiradas, setRetiradas] = useState();
   const [filter, setFilter] = useState();
   const [isLoading, setIsLoading] = useState(true);

   const getAllTintasRetiradas = async () => {
      try {
         const res = await getAllRetiradasTintasService();
         setRetiradas(res.data);
         setIsLoading(false);
      } catch (error) {
         console.log(error);
      }
   };

   const getAllTintasRetiradasByFilter = async () => {
      try {
         setIsLoading(true);
         const res = await getAllRetiradasTintasByFilterService(filter);
         setRetiradas(res.data);
         setIsLoading(false);
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      setTitle("Relatório de Tintas");
      getAllTintasRetiradas();
   }, []);

   useEffect(() => {
      if (filter) {
         getAllTintasRetiradasByFilter(filter);
      }
   }, [filter]);

   if (isLoading) {
      return <Loading />;
   }

   return (
      retiradas && (
         <SupplyReport
            subTitle="Tintas Retiradas"
            supplyDataCollection={retiradas}
            filterParams={filter}
            setFilterParams={setFilter}
         />
      )
   );
}
