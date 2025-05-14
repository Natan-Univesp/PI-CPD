import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { getAllSolicitacoesService } from "../services/requestSupply.service";

const SolicitacaoContext = createContext(null);

export function SolicitacaoProvider({ children }) {
   const [solicitacoes, setSolicitacoes] = useState([]);
   const [isLoading, setIsLoading] = useState();

   const getAllSolicitacoes = async () => {
      const res = await getAllSolicitacoesService();
      setSolicitacoes(res.data);
      setIsLoading(false);

   };

   const init = async () => {
      try {
         await getAllSolicitacoes();
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      init();
   }, []);

   return(
      <SolicitacaoContext.Provider value={{
         getAllSolicitacoes,
         solicitacoes,
         setSolicitacoes,
         isLoading,
         setIsLoading
      }}>
         {children}
      </SolicitacaoContext.Provider>
   )
}


// eslint-disable-next-line react-refresh/only-export-components
export const useSolicitacao = () => useContext(SolicitacaoContext);

SolicitacaoProvider.propTypes = {
   children: PropTypes.oneOfType([
      PropTypes.element,
      PropTypes.arrayOf(PropTypes.element)
   ]),
}
