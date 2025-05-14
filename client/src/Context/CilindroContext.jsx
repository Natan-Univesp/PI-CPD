import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllCilindrosByMarcaService, getAllCilindrosService, getAllTrashCilindrosService } from "../services/cilindro.service";
import { searchFilterSupply } from "../utils/SearchFilterUtil";

const CilindroContext = createContext(null);


export function CilindroProvider({children}) {
   const [cilindros, setCilindros] = useState();
   const [filteredCilindros, setFilteredCilindros] = useState([]);
   const [trashCilindros, setTrashCilindros] = useState(); 
   const [searchValue, setSearchValue] = useState("");
   const [isLoading, setIsLoading] = useState(true);
   const [isTrashLoading, setIsTrashLoading] = useState(true);

   const getAllCilindros = async () => {
      const res = await getAllCilindrosService();
      setCilindros(res.data);
      setFilteredCilindros(res.data);
      setIsLoading(false);
   }

   const getAllTrashCilindros = async () => {
      const res = await getAllTrashCilindrosService();
      setTrashCilindros(res.data);
      setIsTrashLoading(false);
   }

   const getAllCilindrosByMarca = async (marcaId) => {
      if(marcaId !== 0) {
         const res = await getAllCilindrosByMarcaService(marcaId);
         setCilindros(res.data);
      } else {
         const res = await getAllCilindrosService();
         setCilindros(res.data);
      }
   }

   const init = async () => {
      try {
         await getAllCilindros();
         await getAllTrashCilindros();

      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      init();
   }, [])

   useEffect(() => {
      if(cilindros && Array.isArray(cilindros)) {
          const filteredCilindros = searchFilterSupply(cilindros, searchValue)
          setFilteredCilindros(filteredCilindros)
      }
  }, [cilindros, searchValue])

   return(
      <CilindroContext.Provider value={{
         cilindros,
         filteredCilindros,
         setCilindros, 
         isLoading, 
         getAllCilindros,
         getAllCilindrosByMarca,
         trashCilindros, 
         setTrashCilindros, 
         isTrashLoading, 
         getAllTrashCilindros,
         searchValue,
         setSearchValue
      }}>
         {children}
      </CilindroContext.Provider>
   )

}

// eslint-disable-next-line react-refresh/only-export-components
export const useCilindro = () => useContext(CilindroContext);

CilindroProvider.propTypes = {
    children: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.arrayOf(PropTypes.element)
               ]),
}