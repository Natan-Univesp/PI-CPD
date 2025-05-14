import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import InputDefault from "../../Input/InputDefault/InputDefault";
import { TextArea } from "../../TextArea/TextArea";
import SelectSearchable from "../../SelectSearchable/SelectSearchable";
import { findOptionValue } from "../../../utils/ManipulateDataUtil";

export function FormTinta({ dataTinta }) {
    const {
        control,
        register,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm({
        defaultValues: dataTinta || { modelo: "", marca: "", impressoras_compativeis: "", qtd: "" },
    });

    const options = [
        {
            label: "EPSON",
            value: "0000",
        },
        {
            label: "CANON",
            value: "1111",
        },
    ];

    const registerModelo = register("modelo", { required: "Campo Obrigatório!" });
    const registerPrinter = register("impressoras_compativeis", { required: "Campo Obrigatório" });
    const registerQtd = register("qtd", { required: "Campo Obrigatório" });

    const handleTintaSubmit = ({ modelo, marca, impressoras_compativeis, qtd }) => {
        console.log("Modelo: ", modelo);
        console.log("Marca: ", marca);
        console.log("Impressoras Compatíveis: ", impressoras_compativeis);
        console.log("Quantidade: ", Number(qtd));
    };

    return (
        <form
            action=""
            className="layoutFormContentSpacing"
            onSubmit={handleSubmit(handleTintaSubmit)}
        >
            <InputDefault
                type="text"
                id={"modeloTinta"}
                placeholder="ex: 544, 644..."
                textView={"Modelo de Tinta*"}
                register={registerModelo}
                error={errors?.modelo}
            />
            <SelectSearchable
                controlName="marca"
                control={control}
                dataOptions={options}
                placeholder={"Selecione a marca..."}
                textView={"Marca*"}
                error={errors?.marca}
                defaultValue={dataTinta?.marca && findOptionValue(dataTinta.marca, options)}
            />
            <TextArea
                type="text"
                id={"compatPrinter"}
                placeholder="ex: Epson l5290..."
                textView={"Impressoras compatíveis*"}
                register={registerPrinter}
                error={errors?.impressoras_compativeis}
            />
            <InputDefault
                type="number"
                id={"qtdTinta"}
                placeholder="Informe a quantidade"
                textView={"Quantidade (por kit)*"}
                register={registerQtd}
                error={errors?.qtd}
            />
            <button
                className={`buttonForm-style1 ${
                    dataTinta && !isDirty ? "buttonForm-style1__inactive" : ""
                }`}
            >
                Cadastrar Tintas
            </button>
        </form>
    );
}

FormTinta.propTypes = {
    dataTinta: PropTypes.object,
};
