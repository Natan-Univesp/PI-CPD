import { useState } from 'react';
import PropTypes from 'prop-types';
import SupplyBox from "./SupplyBox";
import styles from './SupplyContent.module.css';
//icones
import {AiOutlinePlus as IconAdd} from 'react-icons/ai';
import {AiOutlineMinus as IconRemove} from 'react-icons/ai';

export default function SupplyContent({supplyName = "toner"}) {
    const [numBoxSupply, setNumBoxSupply] = useState([0]);

    /*
    =========================================================================
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
        Funções referentes ao BoxSupply (adiciona e remove Box de Suprimentos)
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    =========================================================================
    */
    const addBoxList = () => {
        if(numBoxSupply.length < 6) {
            //Pega o valor "temporário" atual do NumBox antes da renderização e incrementa um novo elemento dentro do array; 
            setNumBoxSupply(prevNumBox => [...prevNumBox, numBoxSupply[numBoxSupply.length -1] + 1]);
        } 
    
    }

    const delBoxList = () => {
        if(numBoxSupply.length > 1) {
            setNumBoxSupply(prevNumBox => prevNumBox.slice(0, -1));
            
        }
    }

    return(
        <>
            <div className={styles.boxSupply__container}>
                {numBoxSupply.map(numBox => <SupplyBox key={numBox} styles={styles}/>)}
            </div>
            <div className={styles.btnContainer}>
                {numBoxSupply.length > 1 && 
                    <button type='button' onClick={delBoxList} className="fadeIn">
                        <IconRemove/>
                    </button>
                }
                {numBoxSupply.length < 6 && 
                    <button type='button' onClick={addBoxList} className="fadeIn">
                        <IconAdd/>
                    </button>
                }
            </div>
        </>
    )
}

SupplyContent.propTypes = {
    supplyName: PropTypes.string,

}