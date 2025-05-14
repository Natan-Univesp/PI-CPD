import { useState } from "react";
import { useAlert } from "../../../../Context/AlertContext";
import { useTinta } from "../../../../Context/TintaContext";
import { reestoqueTintaService } from "../../../../services/tinta.service";
import InputSearch from "../../../Input/InputSearch/InputSearch";
import { Loading } from "../../../Loading/Loading";
import { TableReestoque } from "../../../Table/TableReestoque/TableReestoque";
import { searchFilterReestoqueSupply } from "../../../../utils/SearchFilterUtil";

export function ModalReestoqueTinta() {
   const [searchFilter, setSearchFilter] = useState("");
   const { showErrorAlert, showSuccessAlert } = useAlert();
   const { tintas, getAllTintas, isLoading } = useTinta();

   const handleReestoqueTinta = async (id, qtd_increment) => {
      try {
         await reestoqueTintaService(id, qtd_increment)
         showSuccessAlert({
            title: "Reestoque realizado com sucesso!"
         });
         await getAllTintas();

      } catch (error) {
         console.log(error);
         if(error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao Reestocar Tinta",
               message: errMessage
            })
         }
      }
   }

   const updateFilterSearch = (e) => {
      const value = e.target.value;
      setSearchFilter(value);
   }

   if(isLoading) return <Loading/>

   return(
      tintas && 
         <>
            <InputSearch type={"text"} 
                           name={"searchSupply"} 
                           id={"searchSupply"}
                           placeholder={"Buscar Suprimentos"} 
                           value={searchFilter}
                           handleOnChange={updateFilterSearch}
                           customClass="modalLayout"/>
            <TableReestoque dataCollection={searchFilterReestoqueSupply(tintas, searchFilter)} 
                            handleUpdateEstoque={handleReestoqueTinta}/>
         </>
   )

}