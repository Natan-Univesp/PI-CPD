import { useState } from 'react';
import styles from './FormCadastro.module.css';
import InputCheck from '../../Input/InputCheck/InputCheck';
import InputDefault from '../../Input/InputDefault/InputDefault';
import InputRadio from '../../Input/InputRadio/InputRadio';
import SupplyContent from './Supply/SupplyContent';

export default function FormCadastro() {
    const [isTonerActive, setIsTonerActive] = useState(false);
    const [isCilindroActive, setIsCilindroActive] = useState(false);
    const [isTintaActive, setIsTintaActive] = useState(false);

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

    return(
        <form>
            <fieldset>
                <legend>Informações da Solicitação</legend>
                <InputDefault type={"text"} name={"nomeQualquer"} id={"infoRequest"} textView={"Nome do Solicitante"} handleAction={() => console.log("olá")}/>
                <div className={styles.optionContainer}>
                    <h4 className={styles.optionTitle}>Setor</h4>
                    <div className={styles.option__collection}>
                        <InputRadio name={"setor"} id={"educacao"} value={"Educação"} textView={"Educação"}/>
                        <InputRadio name={"setor"} id={"saude"} value={"Saúde"} textView={"Saúde"}/>
                        <InputRadio name={"setor"} id={"social"} value={"Social"} textView={"Social"}/>
                        <InputRadio name={"setor"} id={"outro"} value={"Outro"} textView={"Outro"}/>
                    </div>
                </div>
                <InputDefault type={"text"} name={"localSetor"} id={"localSetor"} textView={"Local"} handleAction={() => console.log("Local")}/>
            </fieldset>
            <fieldset>
                <legend>Seleção de Suprimentos</legend>
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
                <fieldset className='fadeIn'>
                    <legend>Toners</legend>
                    <SupplyContent styles={styles}/>
                </fieldset>
            }
            {isCilindroActive &&
                <fieldset className='fadeIn'>
                    <legend>Cilindros</legend>
                    <SupplyContent styles={styles}/>
                </fieldset>
            }
            {isTintaActive &&
                <fieldset className='fadeIn'>
                    <legend>Tintas</legend>
                    <SupplyContent styles={styles}/>
                </fieldset>
            }
            <div className={styles.btnContainer}>
                <button type="button">Cadastrar Solicitação</button>
                
            </div>
        </form>
    )
}