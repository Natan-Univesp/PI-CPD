import PropTypes from "prop-types";
import InputDefault from "../../Input/InputDefault/InputDefault";
import InputFile from "../../Input/InputFile/InputFile";
import { useForm } from "react-hook-form";
import { getItemsDirtyData } from "../../../utils/ManipulateDataUtil";

export function FormMarca({ formAction, dataMarca }) {
   const {
      register,
      handleSubmit,
      watch,
      formState: { errors, isDirty, dirtyFields },
   } = useForm({ defaultValues: dataMarca || { img: "", marca: "" } });

   const registerImg = register("img", { required: !dataMarca ? "Campo Obrigatório!" : false });
   const registerMarca = register("marca", { required: "Campo Obrigatório" });
   const watchImg = watch("img");

   const validateAndSubmit = ({img, marca}) => {
      if(dataMarca) {
        const fieldsModifiedOnly = getItemsDirtyData(dirtyFields, {img, marca});
        formAction(fieldsModifiedOnly);
      } else {
        formAction({img, marca});
      }
   }

   return (
      <form action=""
            className="layoutFormContentSpacing" 
            onSubmit={handleSubmit(validateAndSubmit)}>
         <InputFile register={registerImg} watchImg={watchImg} error={errors?.img} />
         <InputDefault
            type="text"
            id="marcaSupply"
            placeholder="Informe a Marca..."
            textView="Marca"
            register={registerMarca}
            error={errors?.marca}
         />
         <button
            className={`buttonForm-style1 ${
               dataMarca && !isDirty ? "buttonForm-style1__inactive" : ""
            }`}
         >
            {dataMarca ? "Confirmar Alterações" : "Cadastrar Marca"}
         </button>
      </form>
   );
}

FormMarca.propTypes = {
   formAction: PropTypes.func,
   dataMarca: PropTypes.object,
};
