import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { getAllMarcasForSelectService } from "../../../services/marca.service";
import InputDefault from "../../Input/InputDefault/InputDefault";
import SelectSearchable from "../../SelectSearchable/SelectSearchable";
import { TextArea } from "../../TextArea/TextArea";
import { getItemsDirtyData } from "../../../utils/ManipulateDataUtil";

export function FormSupply({ supplyType = "", dataSupply, handleSupplySubmit }) {
   const [options, setOptions] = useState([]);

   const supplyRef = {
      Toner: {
         id: "modeloToner",
         placeholder: "ex: D111, TN750s...",
         textView: "Modelo de Toner*",
      },
      Cilindro: {
         id: "modeloCilindro",
         placeholder: "ex: R116, DR1060...",
         textView: "Modelo de Cilindro*",
      },
      Tinta: {
         id: "modeloTinta",
         placeholder: "ex: 544, 644...",
         textView: "Modelo de Tinta*",
      },
   };

   const {
      control,
      register,
      handleSubmit,
      formState: { errors, isDirty, dirtyFields },
   } = useForm({
      defaultValues: dataSupply || { modelo: "", id_marca: null, printer_compat: "", qtd: "" },
   });

   const registerModelo = register("modelo", { required: "Campo Obrigatório!" });
   const registerPrinter = register("printer_compat", { required: "Campo Obrigatório" });
   const registerQtd = register("qtd", {
      required: "Campo Obrigatório",
      valueAsNumber: true,
      min: { value: 0, message: "Insira um valor maior ou igual a 0" },
   });

   const defineOptionsCategory = async () => {
      try {
         const res = await getAllMarcasForSelectService();
         setOptions(res.data);
      } catch (error) {
         console.log(error);
      }
   };

   const validateAndSubmit = ({ modelo, id_marca, printer_compat, qtd }) => {
      if (dataSupply) {
         const fieldsModifiedOnly = getItemsDirtyData(dirtyFields, {
            modelo,
            id_marca,
            printer_compat,
            qtd,
         });
         handleSupplySubmit(fieldsModifiedOnly);
      } else {
         handleSupplySubmit({ modelo, id_marca, printer_compat, qtd });
      }
   };

   useEffect(() => {
      defineOptionsCategory();
   }, []);

   return (
      <form
         action=""
         className="layoutFormContentSpacing"
         onSubmit={handleSubmit(validateAndSubmit)}
      >
         <InputDefault
            type="text"
            id={supplyRef[supplyType].id}
            placeholder={supplyRef[supplyType].placeholder}
            textView={supplyRef[supplyType].textView}
            register={registerModelo}
            error={errors?.modelo}
         />
         <SelectSearchable
            controlName="id_marca"
            control={control}
            dataOptions={options}
            placeholder={"Selecione a marca..."}
            textView={"Marca*"}
            error={errors?.id_marca}
         />
         <TextArea
            type="text"
            id={"compatPrinter"}
            placeholder="ex: Samsung M2020w"
            textView={"Impressoras compatíveis*"}
            register={registerPrinter}
            error={errors?.printer_compat}
         />
         <InputDefault
            type="number"
            id={"qtdToner"}
            placeholder="Informe a quantidade"
            textView={"Quantidade*"}
            register={registerQtd}
            error={errors?.qtd}
         />
         <button
            className={`buttonForm-style1 ${
               dataSupply && !isDirty ? "buttonForm-style1__inactive" : ""
            }`}
         >
            {`Cadastrar ${supplyType}`}
         </button>
      </form>
   );
}

FormSupply.propTypes = {
   supplyType: PropTypes.string,
   dataSupply: PropTypes.object,
   handleSupplySubmit: PropTypes.func,
};
