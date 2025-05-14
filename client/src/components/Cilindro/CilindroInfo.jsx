import { useOutletContext } from "react-router-dom";
import { useEffect } from "react";

//Ícones
import { FaPlus as IconAddToner } from "react-icons/fa6";
import { FaTrashAlt as IconDel } from "react-icons/fa";
import { PiStackPlus as IconEstoque } from "react-icons/pi";

import SupplyMain from "../Supply/SupplyMain";

//Context
import { useModal } from "../../Context/ModalContext";
import { useCilindro } from "../../Context/CilindroContext";
import { moveCilindroToTrashService } from "../../services/cilindro.service";
import { useAlert } from "../../Context/AlertContext";
import { useInfoExtra } from "../../Context/InfoExtraContext";

export default function CilindroInfo() {
   const { setTitle } = useOutletContext();
   const { showModal } = useModal();
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { 
      cilindros, 
      filteredCilindros,
      getAllCilindros, 
      getAllCilindrosByMarca,
      isLoading,
      getAllTrashCilindros,
      searchValue,
      setSearchValue
   } = useCilindro();
   const { getAllCilindroPageStats } = useInfoExtra();

   const actionList = [
      {
         id: 1,
         icon: <IconAddToner />,
         text: "Adicionar Cilindro",
         placeholder: "ADICIONAR",
         handleOpenModal: () =>
            showModal({ 
                modalName: "registerCilindro", 
                customStyle: { overflow: "initial" }
            }),
      },
      {
         id: 2,
         icon: <IconEstoque />,
         text: "Reestocar Cilindros",
         placeholder: "REESTOCAR",
         handleOpenModal: () => showModal({ modalName: "reestoqueCilindro" }),
      },
      {
         id: 3,
         icon: <IconDel />,
         text: "Lixeira",
         placeholder: "LIXEIRA",
         handleOpenModal: () => showModal({ 
            modalName: "lixeiraCilindro"
         }),
      },
   ];


   const handleDeleteCilindro = async (id) => {
      try {
         const res = await moveCilindroToTrashService(id);
         const { status } = res.data;
         if(status === "success") {
            showSuccessAlert({
               title: "Remoção concluída",
               message: "O cilindro foi movido para a lixeira. Você ainda pode acessar suas informações navegando pela lixeira"
            })
            await getAllCilindros();
            await getAllTrashCilindros();
            await getAllCilindroPageStats();
         }

      } catch (error) {
         console.log(error);
         if(error?.response?.data) {
            const { code, errMessage } = error.response.data;
            
            if(code === "ALREADY_MOVED_SUPPLY") {
               showErrorAlert({
                  title: "Erro ao Mover o Cilindro para a Lixeira",
                  message: errMessage
               })
            }
         }
      }
   }


   //Definição de Título
   useEffect(() => {
      setTitle("Cilindros");
   }, []);

   return (
      <SupplyMain
         subTitle={"Consulta de Cilindros"}
         actionData={actionList}
         supplyInfo={{
            data: filteredCilindros,
            handleEdit: (id) => {
               showModal({
                  modalName: "editCilindro",
                  customStyle: { overflow: "initial" },
                  data: { id },
               });
            },
            handleDelete: handleDeleteCilindro,
            isLoading,
            searchValue,
            setSearchValue,
            getAllSuppliesByMarca: getAllCilindrosByMarca
         }}
      />
   );
}
