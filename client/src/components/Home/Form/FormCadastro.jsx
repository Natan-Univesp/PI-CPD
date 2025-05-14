import { useEffect, useRef, useState } from 'react';
import styles from './FormCadastro.module.css';
import InputCheck from '../../Input/InputCheck/InputCheck';
import InputDefault from '../../Input/InputDefault/InputDefault';
import InputRadio from '../../Input/InputRadio/InputRadio';
import { SupplyBox } from './Supply/SupplyBox';
import { useCadastroReq } from '../../../Context/CadastroReqContext';
import { useModal } from '../../../Context/ModalContext';
import { Loading } from '../../Loading/Loading';

export default function FormCadastro() {
    const { showModal } = useModal();
 
    const {
            watch,
            reset,
            resetField,
            handleSubmit,
            errors,
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
            isLoadingToner,
            isLoadingCilindro,
            isLoadingTinta
    } = useCadastroReq();

    const [isTonerActive, setIsTonerActive] = useState(false);
    const [isCilindroActive, setIsCilindroActive] = useState(false);
    const [isTintaActive, setIsTintaActive] = useState(false);
    const [isReseted, setIsReseted] = useState(false);
    const isSupplySelectRef = useRef(false);

    const watchTonerSupply = watch("tonerSupply");
    const watchCilindroSupply = watch("cilindroSupply");
    const watchTintaSupply = watch("tintaSupply");

    const handleEnableDisableSupply = (supply) => {
        switch(supply) {
            case "toner":
                setIsTonerActive(!isTonerActive);
                break;
            case "cilindro":
                setIsCilindroActive(!isCilindroActive);
                break;
            case "tinta":
                setIsTintaActive(!isTintaActive);
                break;
            default:
                console.log("Suprimento não encontrado!");
                break;
        }
    }

    const compareFieldValueToDefaultValue = (supplyCollection) => {
        const currSupply = supplyCollection?.[0] || [];

        if(currSupply?.supply === "" && currSupply?.qtd === "") {
            return true 
        }
        return false
    }

    const handleMergeAllSupplies = (toner, cilindro, tinta) => {
        const allSupplies = [];
        
        if(!compareFieldValueToDefaultValue(toner)) {
            allSupplies.push(...toner)
        }
        if(!compareFieldValueToDefaultValue(cilindro)) {
            allSupplies.push(...cilindro);
        }
        if(!compareFieldValueToDefaultValue(tinta)) {
            allSupplies.push(...tinta);
        }
        return allSupplies;
        
    }

    const handleCadastro = ({solicitante, setor, local, tonerSupply, cilindroSupply, tintaSupply}) => {
        if(!isTonerActive && !isCilindroActive && !isTintaActive) {
            isSupplySelectRef.current = true;

        } else {
            isSupplySelectRef.current = false;
            const supplies = handleMergeAllSupplies(tonerSupply, cilindroSupply, tintaSupply);
            showModal({modalName: "confirmRequestSupply", data: {
                solicitanteInfo: { solicitante, setor, local },
                supplies,
                reset,
                setIsReseted
            }});

        }
        
    }

    // Remove as informações de suprimento caso o mesmo seja desabilitado após o preenchimento
    useEffect(() => {
        if(!isTonerActive && !compareFieldValueToDefaultValue(watchTonerSupply)) {
            resetField("tonerSupply");

        }
        if(!isCilindroActive && !compareFieldValueToDefaultValue(watchCilindroSupply)) {
            resetField("cilindroSupply")

        }
        if(isTintaActive && !compareFieldValueToDefaultValue(watchTintaSupply)) {
            resetField("tintaSupply");

        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTonerActive, isCilindroActive, isTintaActive, reset])

    useEffect(() => {
        if(isReseted) {
            setIsTonerActive(false);
            setIsCilindroActive(false);
            setIsTintaActive(false);
            setIsReseted(false);
        }
    }, [isReseted]);

    return(
        <form onSubmit={handleSubmit(handleCadastro)} className={styles.requestSupplyContainer}>
            <fieldset>
                <legend>Informações da Solicitação</legend>
                <InputDefault type={"text"} 
                              id="solicitante" 
                              textView={"Nome do Solicitante"}
                              placeholder='ex: Claudio Pereira' 
                              register={inputSolicitante} 
                              error={errors?.solicitante}/>
                <div className={styles.optionContainer}>
                    <h4 className={styles.optionTitle} style={(errors?.setor) ? {color: "var(--colorRed)"} : {}}>Setor</h4>
                    <div className={styles.option__collection}>
                        <InputRadio id={"educacao"} value={"Educação"} textView={"Educação"} register={inputSetor}/>
                        <InputRadio id={"saude"} value={"Saúde"} textView={"Saúde"} register={inputSetor}/>
                        <InputRadio id={"social"} value={"Social"} textView={"Social"} register={inputSetor}/>
                        <InputRadio id={"outro"} value={"Outro"} textView={"Outro"} register={inputSetor}/>
                    </div>
                    {errors?.setor && <span className="errorMessage fadeIn">{errors?.setor?.message}</span>}
                </div>
                <InputDefault type={"text"} 
                              id="local" 
                              textView={"Local"} 
                              placeholder='ex: ESF Jardim América'
                              register={inputLocal} 
                              error={errors?.local}/>
            </fieldset>
            <fieldset>
                <legend>Seleção de Suprimentos</legend>
                {isSupplySelectRef.current && <span className="errorMessage">Selecione o Suprimento</span>}
                <div className={styles.inputCheck__collection}>
                    <InputCheck name={"check1"} 
                                id={"check1"} 
                                textView={"Toners"} 
                                handleOnChange={() => handleEnableDisableSupply("toner")}/>
                    <InputCheck name={"check2"} 
                                id={"check2"} 
                                textView={"Cilindros"} 
                                handleOnChange={() => handleEnableDisableSupply("cilindro")}/>
                    <InputCheck name={"check3"} 
                                id={"check3"} 
                                textView={"Tintas"}
                                handleOnChange={() => handleEnableDisableSupply("tinta")}/>
                </div>
                
            </fieldset>
            {isTonerActive &&
                (isLoadingToner 
                    ? <Loading/> 
                    : <fieldset className='fadeIn'>
                        <legend>Toners</legend>
                        <SupplyBox supplyType='Toner'
                                fieldKey='tonerSupply'
                                fields={fieldToner} 
                                append={appendToner}
                                remove={removeToner}/>
                      </fieldset>)
            }
            {isCilindroActive &&
                (isLoadingCilindro
                    ? <Loading/>
                    : <fieldset className='fadeIn'>
                        <legend>Cilindros</legend>
                        <SupplyBox supplyType='Cilindro'
                                fieldKey='cilindroSupply'
                                fields={fieldCilindro}
                                append={appendCilindro}
                                remove={removeCilindro}/>
                      </fieldset>)
            }
            {isTintaActive &&
                (isLoadingTinta
                    ? <Loading/>
                    : <fieldset className='fadeIn'>
                        <legend>Tintas</legend>
                        <SupplyBox supplyType='Tinta'
                                fieldKey='tintaSupply'
                                fields={fieldTinta}
                                append={appendTinta}
                                remove={removeTinta}/>
                      </fieldset>)
                
            }
            <div className={styles.btnContainer}>
                <button type="submit">Cadastrar Solicitação</button>
                
            </div>
        </form>
    )
}