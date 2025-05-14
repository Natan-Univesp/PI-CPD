import InputSearch from "../../Input/InputSearch/InputSearch";
import TableDefault from "../../Table/TableDefault/TableDefault";
import { useModal } from "../../../Context/ModalContext";
import { useEffect, useState } from "react";
import { getAllTonersService } from "../../../services/toner.service";
import { getAllCilindrosService } from "../../../services/cilindro.service";
import { getAllTintasService } from "../../../services/tinta.service";
import { convertAllObjectValueOfArrayFromStringToArray } from "../../../utils/ManipulateDataUtil";
import { searchFilterSupply } from "../../../utils/SearchFilterUtil";
import { Loading } from "../../Loading/Loading";

export function ModalAtalho() {
   const { showDataInfo } = useModal();
   const { supplyType } = showDataInfo();
   const [supply, setSupply] = useState([]);
   const [searchFilter, setSearchFilter] = useState("");
   const [isLoading, setIsLoading] = useState(true);

   const fieldCollection = ["ID", "Modelo", "Marca", "Impressoras Compatíveis", "Quantidade"];
   const fieldsExcludes = ["img", "updated_at"];

   const init = async () => {
      try {
         let res;
         switch (supplyType) {
            case "toner":
               res = await getAllTonersService();
               break;
            case "cilindro":
               res = await getAllCilindrosService();
               break;
            case "tinta":
               res = await getAllTintasService();
               break;
            default:
               throw new Error("Suprimento inválido");
         }
         setSupply(res.data);
         setIsLoading(false);
      } catch (error) {
         console.log(error);
      }
   };

   const updateFilterSearch = (e) => {
      const value = e.target.value;
      setSearchFilter(value);
   };

   const showSupply = (supplyRef, searchValueRef) => {
      const filteredSupply = searchFilterSupply(supplyRef, searchValueRef);
      const formattedSupply = convertAllObjectValueOfArrayFromStringToArray(filteredSupply, "printer_compat");
      return formattedSupply;
   };

   useEffect(() => {
      init();
   }, [supplyType]);

   if (isLoading) {
      return <Loading />;
   }

   return (
      supply && (
         <>
            <InputSearch
               type={"text"}
               name={"searchSupply"}
               id={"searchSupply"}
               placeholder={`Buscar ${supplyType}`}
               value={searchFilter}
               handleOnChange={updateFilterSearch}
               customClass="modalLayout"
            />
            <TableDefault
               fieldCollection={fieldCollection}
               fieldsExcludes={fieldsExcludes}
               dataCollection={showSupply(supply, searchFilter)}
               isModalChildren={true}
            />
         </>
      )
   );
}
