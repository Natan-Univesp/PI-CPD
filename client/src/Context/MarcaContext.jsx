import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { getAllMarcasService, getMarcaByIdService } from "../services/marca.service";

const MarcaContext = createContext(null);

export function MarcaProvider({children}) {
   const [marcas, setMarcas] = useState();
   const [isLoading, setIsLoading]= useState(true); 

   const getAllMarcas = async () => {
      try {
         const res = await getAllMarcasService();
         setMarcas(res.data);
         setIsLoading(false);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      getAllMarcas();
   }, [])

   return(
      <MarcaContext.Provider value={{marcas, setMarcas, isLoading}}>
         {children}
      </MarcaContext.Provider>
   )
}


// eslint-disable-next-line react-refresh/only-export-components
export const useMarca = () => useContext(MarcaContext);

MarcaProvider.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
   ]),
}