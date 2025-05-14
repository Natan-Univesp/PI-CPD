import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { SupplyItem } from './SupplyItem';
import styles from './SupplyBox.module.css';
//icones
import {AiOutlinePlus as IconAdd} from 'react-icons/ai';
import {AiOutlineMinus as IconRemove} from 'react-icons/ai';
import { useCadastroReq } from '../../../../Context/CadastroReqContext';

export function SupplyBox({supplyType = "", fieldKey = "", fields = [], append, remove}) {
    const { 
        register, 
        tonerOptions, 
        cilindroOptions, 
        tintaOptions 
    } = useCadastroReq();
    const [dataOptions, setDataOptions] = useState();

    /*
    =========================================================================
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Funções referentes ao BoxSupply (adiciona e remove Box de Suprimentos)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    =========================================================================
    */
    const addBoxList = () => {
        if(fields.length < 6) {
            append({supply: "", tipo: supplyType, qtd: ""})
        } 
    
    }

    const delBoxList = () => {
        if(fields.length > 1) {
            remove(fields.length - 1)
            
        }
    }

    useEffect(() => {
        switch(supplyType) {
            case "Toner":
                setDataOptions(tonerOptions);
                break;
            case "Cilindro":
                setDataOptions(cilindroOptions);
                break;
            case "Tinta":
                setDataOptions(tintaOptions);
                break;
            default:
                setDataOptions([]);
                break;
        }
    },[])

    return(
        dataOptions &&
        <>
            <div className={styles.boxSupply__container}>
                {fields.map((item, index) => {
                    const inputQtd = register(`${fieldKey}.${index}.qtd`, {required: "Campo Obrigatório!", 
                                                                           valueAsNumber: true, 
                                                                           min: { value: 1, message: "Insira um valor maior que 0" }});
                    return(
                        <SupplyItem key={item.id} 
                                    fieldKey={fieldKey}
                                    index={index}
                                    registerQtd={inputQtd}
                                    options={dataOptions}/>
                    )
                })}
            </div>
            <div className={styles.btnContainer}>
                {fields.length > 1 && 
                    <button type='button' onClick={delBoxList} className="fadeIn">
                        <IconRemove/>
                    </button>
                }
                {fields.length < 6 && 
                    <button type='button' onClick={addBoxList} className="fadeIn">
                        <IconAdd/>
                    </button>
                }
            </div>
        </>
    )
}

SupplyBox.propTypes = {
    supplyType: PropTypes.string,
    fieldKey: PropTypes.string,
    fields: PropTypes.array,
    append: PropTypes.func,
    remove: PropTypes.func,

}