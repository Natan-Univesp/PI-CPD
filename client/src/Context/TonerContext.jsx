import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getAllTonersByMarcaService, getAllTonersService, getAllTrashTonersService } from "../services/toner.service";
import { searchFilterSupply } from "../utils/SearchFilterUtil";

const TonerContext = createContext(null);

export function TonerProvider({children}) {
    const [toners, setToners] = useState();
    const [filteredToners, setFilteredToners] = useState();
    const [trashToners, setTrashToners] = useState();
    const [searchValue, setSearchValue] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isTrashLoading, setIsTrashLoading] = useState(true);
    
    const getAllToners = async () => {
        const res = await getAllTonersService();
        setToners(res.data);
        setFilteredToners(res.data);
        setIsLoading(false);
    }

    const getAllTrashToners = async () => {
        const res = await getAllTrashTonersService();
        setTrashToners(res.data);
        setIsTrashLoading(false);
    }

    const getAllTonersByMarca = async (marcaId) => {
        if(marcaId !== 0) {
            const res = await getAllTonersByMarcaService(marcaId);
            setToners(res.data);
        } else {
            const res = await getAllTonersService();
            setToners(res.data);
        }
    }

    const init = async () => {
        try {
            await getAllToners();
            await getAllTrashToners();
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        init();
    }, [])

    useEffect(() => {
        if(toners && Array.isArray(toners)) {
            const filteredToners = searchFilterSupply(toners, searchValue);
            setFilteredToners(filteredToners)
        }
    }, [toners, searchValue])

    return(
        <TonerContext.Provider value={{
            toners,
            filteredToners, 
            setToners, 
            isLoading, 
            getAllToners,
            getAllTonersByMarca,
            trashToners, 
            setTrashToners, 
            isTrashLoading, 
            getAllTrashToners,
            searchValue,
            setSearchValue
        }}>
            {children}
        </TonerContext.Provider>
    )
}


// eslint-disable-next-line react-refresh/only-export-components
export const useToner = () => useContext(TonerContext);


TonerProvider.propTypes = {
    children: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.arrayOf(PropTypes.element)
                ]),
}