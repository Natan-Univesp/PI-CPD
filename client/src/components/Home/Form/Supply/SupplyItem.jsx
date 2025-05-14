import PropTypes from 'prop-types';
import InputDefault from '../../../Input/InputDefault/InputDefault';
import SelectSearchable from '../../../SelectSearchable/SelectSearchable';
import styles from "./SupplyBox.module.css";
import { useCadastroReq } from '../../../../Context/CadastroReqContext';

export function SupplyItem({fieldKey = "", index = 0, registerQtd, options}) {
    const { control, errors } = useCadastroReq();

    const controlSupplyName = `${fieldKey}.${index}.supply`;
    const errorQtd = errors?.[fieldKey]?.[index]?.qtd;
    const errorSupply = errors?.[fieldKey]?.[index]?.supply;
    

    return(
        <div className={`${styles.boxSupply__content} fadeLeft`}>
            <SelectSearchable controlName={controlSupplyName} 
                              control={control} 
                              dataOptions={options} 
                              textView={"Toner*"} 
                              placeholder={"Buscar..."}
                              error={errorSupply}/>
            <InputDefault type={"number"} 
                          id={"supplyQtd"} 
                          textView={"Quantidade*"}
                          placeholder='informe...'
                          register={registerQtd}
                          error={errorQtd}/>
        </div>
    )
}

SupplyItem.propTypes = {
    fieldKey: PropTypes.string,
    index: PropTypes.number,
    registerQtd: PropTypes.object,
    options: PropTypes.array
}