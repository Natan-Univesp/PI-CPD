import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllTintasByMarcaService, getAllTintasService, getAllTrashTintasService } from "../services/tinta.service";
import { searchFilterSupply } from "../utils/SearchFilterUtil";

const TintaContext = createContext(null);

export function TintaProvider({ children }) {
   const [tintas, setTintas] = useState();
   const [filteredTintas, setFilteredTintas] = useState();
   const [trashTintas, setTrashTintas] = useState();
   const [searchValue, setSearchValue] = useState("");
   const [isLoading, setIsLoading] = useState(true);
   const [isTrashLoading, setIsTrashLoading] = useState(true);

   const getAllTintas = async () => {
      const res = await getAllTintasService();
      setTintas(res.data);
      setFilteredTintas(res.data);
      setIsLoading(false);
   };

   const getAllTrashTintas = async () => {
      const res = await getAllTrashTintasService();
      setTrashTintas(res.data);
      setIsTrashLoading(false);
   }

   const getAllTintasByMarca = async (marcaId) => {
      if(marcaId !== 0) {
         const res = await getAllTintasByMarcaService(marcaId);
         setTintas(res.data);

      } else {
         const res = await getAllTintasService();
         setTintas(res.data);
      }
   }

   const init = async () => {
      try {
         await getAllTintas();
         await getAllTrashTintas();
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      init();
   }, []);

   useEffect(() => {
      console.log(tintas);
      if(tintas) {
          const filteredTintas = searchFilterSupply(tintas, searchValue);
          setFilteredTintas(filteredTintas)
      }
  }, [tintas, searchValue])

   return (
      <TintaContext.Provider value={{ 
         tintas,
         filteredTintas,
         setTintas, 
         isLoading, 
         getAllTintas,
         getAllTintasByMarca,
         trashTintas,
         setTrashTintas,
         isTrashLoading,
         getAllTrashTintas,
         searchValue,
         setSearchValue
      }}>
         {children}
      </TintaContext.Provider>
   );
}


// eslint-disable-next-line react-refresh/only-export-components
export const useTinta = () => useContext(TintaContext);


TintaProvider.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
   ]),
}