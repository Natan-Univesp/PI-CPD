import { createContext, useContext, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import PropTypes from "prop-types";

import { 
    getAllMarcasWithCilindrosForSelectService,
    getAllMarcasWithTintasForSelectService, 
    getAllMarcasWithTonersForSelectService 
} from "../services/marca.service";

const CadastroReqContext = createContext(null);

export function CadastroReqProvider({children}) {
    const [tonerOptions, setTonerOptions] = useState();
    const [cilindroOptions, setCilindroOptions] = useState();
    const [tintaOptions, setTintaOptions] = useState();
    // Loading
    const [isLoadingToner, setIsLoadingToner] = useState(true);
    const [isLoadingCilindro, setIsLoadingCilindro] = useState(true);
    const [isLoadingTinta, setIsLoadingTinta] = useState(true);

    const defaultValues = {
        solicitante: "", 
        setor: "", 
        local: "", 
        tonerSupply: [{supply: "", tipo: "Toner", qtd: ""}],
        cilindroSupply: [{supply: "", tipo: "Cilindro", qtd: ""}],
        tintaSupply: [{supply: "", tipo: "Tinta", qtd: ""}]
    }

    const {
        control,
        register,
        watch,
        reset,
        resetField,
        handleSubmit,
        formState: { errors, dirtyFields }
    } = useForm({defaultValues});

    const inputSolicitante = register("solicitante", {required: "Campo Obrigatório!"});
    const inputSetor = register("setor", {required: "Campo Obrigatório!"});
    const inputLocal = register("local", {required: "Campo Obrigatório"});

    const {
        fields: fieldToner,
        append: appendToner,
        remove: removeToner
    } = useFieldArray({control, name: "tonerSupply"});

    const { 
        fields: fieldCilindro, 
        append: appendCilindro, 
        remove: removeCilindro 
    } = useFieldArray({control, name: "cilindroSupply"});

    const { 
            fields: fieldTinta, 
            append: appendTinta, 
            remove: removeTinta 
    } = useFieldArray({control, name: "tintaSupply"});


    const getAllTonersOptions = async () => {
        const res = await getAllMarcasWithTonersForSelectService();
        setTonerOptions(res.data);
        setIsLoadingToner(false);
    }

    const getAllCilindroOptions = async () => {
        const res = await getAllMarcasWithCilindrosForSelectService();
        setCilindroOptions(res.data);
        setIsLoadingCilindro(false);
    }

    const getAllTintaOptions = async () => {
        const res = await getAllMarcasWithTintasForSelectService();
        setTintaOptions(res.data);
        setIsLoadingTinta(false);
    }

    const init = async () => {
        try {
            await getAllTonersOptions();
            await getAllCilindroOptions();
            await getAllTintaOptions();

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        init();
    }, [])

    return(
        <CadastroReqContext.Provider value={{
                                                control, 
                                                register,
                                                watch,
                                                defaultValues,
                                                reset,
                                                resetField,
                                                errors,
                                                dirtyFields,
                                                handleSubmit, 
                                                inputSolicitante, 
                                                inputSetor, 
                                                inputLocal,
                                                fieldToner,
                                                fieldCilindro,
                                                fieldTinta,
                                                appendToner,
                                                appendCilindro,
                                                appendTinta,
                                                removeToner,
                                                removeCilindro,
                                                removeTinta,
                                                //options
                                                tonerOptions,
                                                cilindroOptions,
                                                tintaOptions,
                                                isLoadingToner,
                                                isLoadingCilindro,
                                                isLoadingTinta
                                            }}>
            {children}
        </CadastroReqContext.Provider>
    )

}

// eslint-disable-next-line react-refresh/only-export-components
export const useCadastroReq = () => useContext(CadastroReqContext)

CadastroReqProvider.propTypes = {
    children: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.arrayOf(PropTypes.element)
                ]),
}