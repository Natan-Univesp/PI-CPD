import InputDefault from "../../Input/InputDefault/InputDefault";
import SelectSearchable from "../../SelectSearchable/SelectSearchable";

export function FormToner() {
    const options = [
        {
            label: "HP",
            value: "1111"
        },
        {
            label: "Samsung",
            value: "2222"
        },
        {
            label: "Brother",
            value: "3333"
        },
        {
            label: "Xerox",
            value: "4444"
        }
    ]

    return(
        <form action="" className="layoutFormContentSpacing">
            <InputDefault type="text" name="modeloToner" id={"modeloToner"} placeholder="ex: D111, TN750s..." textView={"Modelo de Toner*"}/>
            <SelectSearchable dataOptions={options} placeholder={"Selecione a marca..."} textView={"Marca*"}/>
            <InputDefault type="text" name="compatPrinter" id={"compatPrinter"} placeholder="ex: Samsung M2020w" textView={"Impressoras compatíveis*"}/>
            <InputDefault type="number" name="qtdToner" id={"qtdToner"} placeholder="Informe a quantidade" textView={"Quantidade*"}/>
            <button className="buttonForm-style1">Cadastrar Toner</button>
        </form>
    )
}