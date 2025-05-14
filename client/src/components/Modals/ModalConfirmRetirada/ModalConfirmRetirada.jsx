import { useForm } from "react-hook-form";
import InputDefault from "../../Input/InputDefault/InputDefault";
import styles from "./ModalConfirmRetirada.module.css";
import { useAlert } from "../../../Context/AlertContext";
import { useModal } from "../../../Context/ModalContext";
import React, { useEffect, useState } from "react";
import { createRetiradaSupplyService } from "../../../services/retiradaSupply.service";
import { useInfoExtra } from "../../../Context/InfoExtraContext";

export function ModalConfirmRetirada() {
   const [suppliesRetirada, setSuppliesRetirada] = useState();
   const { showDataInfo, closeModal } = useModal();
   const { supplies, idRequest, getAllSolicitacoes } = showDataInfo();
   const { getAllHomePageStats } = useInfoExtra();
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({ defaultValues: { pessoaRetirada: "" } });

   const { showSuccessAlert } = useAlert();
   const registerPessoaRetirada = register("pessoaRetirada", { required: "Campo Obrigatório!" });

   const handleConfirmRetirada = async (data) => {
      try {
         const retirado_por = data.pessoaRetirada;
         if (idRequest) {
            const res = await createRetiradaSupplyService({
               retirado_por,
               id_reqSupply: idRequest,
            });
            showSuccessAlert({
               title: "Retirada Realizada",
               message: "Todos os suprimentos disponíveis foram retirados",
            });
         } else {
            const res = await createRetiradaSupplyService({
               retirado_por,
               id_supply_item: supplies.id,
            });
            showSuccessAlert({
               title: "Retirada Realizada",
               message: "O Suprimento foi retirado com sucesso!",
            });
         }
         await getAllSolicitacoes();
         await getAllHomePageStats();
         closeModal();

      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      if (!Array.isArray(supplies)) {
         setSuppliesRetirada(Array(supplies));
      } else {
         setSuppliesRetirada(supplies);
      }
   }, []);

   return (
      suppliesRetirada && (
         <form
            action=""
            className="layoutFormContentSpacing"
            onSubmit={handleSubmit(handleConfirmRetirada)}
         >
            <InputDefault
               type="text"
               id="pessoaRetirada"
               placeholder="Responsável"
               textView="Responsável por Retirada*"
               register={registerPessoaRetirada}
               error={errors?.pessoaRetirada}
            />
            <fieldset className={styles.resumeSupplyContainer}>
               <legend>Suprimento(s) a ser(em) Retirado(s)</legend>
               {suppliesRetirada.map((supply) => (
                  supply.status !== "INDISPONIVEL" &&
                  <React.Fragment key={supply.id}>
                     <p>
                        <strong>Suprimento: </strong>
                        {supply.modelo}
                     </p>
                     <hr />
                  </React.Fragment>
               ))}
            </fieldset>
            <button className="buttonForm-style1">Confirmar Retirada</button>
         </form>
      )
   );
}
