import { useState } from "react";
import { useAlert } from "../../../../Context/AlertContext";
import { useCilindro } from "../../../../Context/CilindroContext";
import { reestoqueCilindroService } from "../../../../services/cilindro.service";
import InputSearch from "../../../Input/InputSearch/InputSearch";
import { Loading } from "../../../Loading/Loading";
import { TableReestoque } from "../../../Table/TableReestoque/TableReestoque";
import { searchFilterReestoqueSupply } from "../../../../utils/SearchFilterUtil";

export function ModalReestoqueCilindro() {
   const [searchFilter, setSearchFilter] = useState("");
   const { showErrorAlert, showSuccessAlert } = useAlert();
   const { cilindros, getAllCilindros, isLoading } = useCilindro();

   const handleReestoqueCilindro = async (id, qtd_increment) => {
      try {
         await reestoqueCilindroService(id, qtd_increment)
         showSuccessAlert({
            title: "Reestoque realizado com sucesso!"
         });
         await getAllCilindros();

      } catch (error) {
         console.log(error);
         if(error?.response?.data) {
            const { errMessage } = error.response.data;

            showErrorAlert({
               title: "Erro ao Reestocar Cilindro",
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
      cilindros &&
         <>
            <InputSearch type={"text"} 
                           name={"searchSupply"} 
                           id={"searchSupply"}
                           placeholder={"Buscar Suprimentos"} 
                           value={searchFilter}
                           handleOnChange={updateFilterSearch}
                           customClass="modalLayout"/>
            <TableReestoque dataCollection={searchFilterReestoqueSupply(cilindros, searchFilter)} 
                            handleUpdateEstoque={handleReestoqueCilindro}/>
         </>
   )

}