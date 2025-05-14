import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

//Ícones
import { FaPlus as IconAddToner } from "react-icons/fa6";
import { FaTrashAlt as IconDel } from "react-icons/fa";
import { PiStackPlus as IconEstoque } from "react-icons/pi";

//Component
import SupplyMain from "../Supply/SupplyMain";

//Context
import { useModal } from "../../Context/ModalContext";
import { useToner } from "../../Context/TonerContext";
import { moveTonerToTrashService } from "../../services/toner.service";
import { useAlert } from "../../Context/AlertContext";
import { useInfoExtra } from "../../Context/InfoExtraContext";

export default function TonerInfo() {
   const { setTitle } = useOutletContext();
   const { showModal } = useModal();
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { 
      toners,
      filteredToners,
      getAllToners, 
      getAllTonersByMarca,
      isLoading,
      getAllTrashToners,
      searchValue,
      setSearchValue
   } = useToner();
   const { getAllTonerPageStats } = useInfoExtra();

   const actionList = [
      {
         id: 1,
         icon: <IconAddToner />,
         text: "Adicionar Toner",
         placeholder: "ADICIONAR",
         nomeModal: "addToner",
         handleOpenModal: () =>
            showModal({
               modalName: "registerToner",
               customStyle: { overflow: "initial" }
            }),
      },
      {
         id: 2,
         icon: <IconEstoque />,
         text: "Reestocar Toners",
         placeholder: "REESTOCAR",
         handleOpenModal: () => showModal({ 
            modalName: "reestoqueToner"
         }),
      },
      {
         id: 3,
         icon: <IconDel />,
         text: "Lixeira",
         placeholder: "LIXEIRA",
         handleOpenModal: () => showModal({ 
            modalName: "lixeiraToner"
         }),
      },
   ];

   const handleDeleteToner = async (id) => {
      try {
         const res = await moveTonerToTrashService(id);
         const { status } = res.data;
         if(status === "success") {
            showSuccessAlert({
               title: "Remoção Concluída",
               message: "O toner foi movido para a lixeira. Você ainda pode acessar suas informações navegando pela lixeira"
            })
            await getAllToners();
            await getAllTrashToners();
            await getAllTonerPageStats();
         }
      } catch (error) {
         console.log(error);
         if(error?.response?.data) {
            const { code, errMessage } = error.response.data;
            
            if(code === "ALREADY_MOVED_SUPPLY") {
               showErrorAlert({
                  title: "Erro ao Mover o Toner para a Lixeira",
                  message: errMessage
               })
            }
         }
         
      }
   }

   //Definição de título
   useEffect(() => {
      setTitle("Toners");
   }, []);

   return (
      <SupplyMain
         subTitle={"Consulta de Toners"}
         actionData={actionList}
         supplyInfo={{
            data: filteredToners,
            handleEdit: (id) => {
               showModal({
                  modalName: "editToner",
                  customStyle: { overflow: "initial" },
                  data: { id },
               });
            },
            handleDelete: handleDeleteToner,
            isLoading,
            searchValue,
            setSearchValue,
            getAllSuppliesByMarca: getAllTonersByMarca
         }}
      />
   );
}
