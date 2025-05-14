import { useAlert } from "../../../../Context/AlertContext";
import InputSearch from "../../../Input/InputSearch/InputSearch";
import { TableReestoque } from "../../../Table/TableReestoque/TableReestoque";
import { reestoqueTonerService } from "../../../../services/toner.service";
import { Loading } from "../../../Loading/Loading";
import { useToner } from "../../../../Context/TonerContext";
import { useState } from "react";
import { searchFilterReestoqueSupply } from "../../../../utils/SearchFilterUtil";

export function ModalReestoqueToner() {
   const [searchFilter, setSearchFilter] = useState("");
   const { showErrorAlert, showSuccessAlert } = useAlert();
   const { 
      toners, 
      getAllToners, 
      isLoading,
   } = useToner();

   const handleReestoqueToner = async (id, qtd_increment) => {
      try {
         await reestoqueTonerService(id, qtd_increment)
         showSuccessAlert({
            title: "Reestoque realizado com sucesso!"
         });
         await getAllToners();

      } catch (error) {
         console.log(error);
         if(error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao Reestocar Toner",
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
      toners &&
         <>
            <InputSearch type={"text"} 
                         name={"searchSupply"} 
                         id={"searchSupply"}
                         placeholder={"Buscar Suprimentos"}
                         value={searchFilter}
                         handleOnChange={updateFilterSearch}
                         customClass="modalLayout"/>
            <TableReestoque dataCollection={searchFilterReestoqueSupply(toners, searchFilter)} 
                            handleUpdateEstoque={handleReestoqueToner}/>
         </>
   )
}