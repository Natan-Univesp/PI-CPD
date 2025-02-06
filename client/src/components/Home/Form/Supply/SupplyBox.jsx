import PropTypes from 'prop-types';
import InputDefault from '../../../Input/InputDefault/InputDefault';
import SelectSearchable from '../../../SelectSearchable/SelectSearchable';

export default function SupplyBox({supplyCollection = [], setSupply, styles}) {
    const options = [
        {
            label: "Brother", 
            options: [
                {value: "TN750S", label: "TN750S"},
                {value: "TN580", label: "TN580"}
            ]
        },
        {
            label: "Samsung", 
            options: [
                {value: "D111", label: "D111"},
            ]
        },
        {
            label: "HP",
            options: [
                {value: "58A", label: "58A"}
            ]
        }
    ]

    return(
        <div className={`${styles.boxSupply__content} fadeLeft`}>
            <SelectSearchable dataOptions={options} textView={"Toner"} placeholder={"Buscar..."}/>
            <InputDefault type={"number"} name={"qtd"} id={"supplyQtd"} textView={"Quantidade"} onWheel={(e) => e.target.blur()}/>
        </div>
    )
}

SupplyBox.propTypes = {
    supplyCollection: PropTypes.array,
    setSupply: PropTypes.func,
    styles: PropTypes.object
}