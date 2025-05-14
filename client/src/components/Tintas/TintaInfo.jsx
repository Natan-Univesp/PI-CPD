import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import SupplyMain from "../Supply/SupplyMain";

// Context
import { useModal } from "../../Context/ModalContext";
import { useTinta } from "../../Context/TintaContext";

//Ícones
import { FaPlus as IconAdd } from "react-icons/fa6";
import { FaTrashAlt as IconDel } from "react-icons/fa";
import { PiStackPlus as IconEstoque } from "react-icons/pi";
import { moveTintaToTrashService } from "../../services/tinta.service";
import { useAlert } from "../../Context/AlertContext";
import { useInfoExtra } from "../../Context/InfoExtraContext";

export default function TintaInfo() {
   const { setTitle } = useOutletContext();
   const { showModal } = useModal();
   const { showSuccessAlert, showErrorAlert } = useAlert();
   const { 
      tintas,
      filteredTintas,
      getAllTintas, 
      getAllTintasByMarca,
      isLoading,
      getAllTrashTintas,
      searchValue,
      setSearchValue
   } = useTinta();
   const { getAllTintaPageStats } = useInfoExtra();

   const actionList = [
      {
         id: 1,
         icon: <IconAdd />,
         text: "Adicionar Tinta",
         placeholder: "ADICIONAR",
         handleOpenModal: () =>
            showModal({
               modalName: "registerTinta",
               customStyle: { overflow: "initial" }
            }),
      },
      {
         id: 2,
         icon: <IconEstoque />,
         text: "Reestocar Tintas",
         placeholder: "REESTOCAR",
         handleOpenModal: () => showModal({ modalName: "reestoqueTinta" }),
      },
      {
         id: 3,
         icon: <IconDel />,
         text: "Lixeira",
         placeholder: "LIXEIRA",
         handleOpenModal: () => showModal({ 
            modalName: "lixeiraTinta" 
         }),
      },
   ];


   const handleDeleteTinta = async (id) => {
      try {
         const res = await moveTintaToTrashService(id);
         const { status } = res.data;
         if(status === "success") {
            showSuccessAlert({
               title: "Remoção Concluída",
               message: "A Tinta foi movida para a lixeira. Você ainda pode acessar suas informações navegando pela lixeira"
            })
            await getAllTintas();
            await getAllTrashTintas();
            await getAllTintaPageStats();
         }
      } catch (error) {
         console.log(error);
         if(error?.response?.data) {
            const { code, errMessage } = error.response.data;
            
            if(code === "ALREADY_MOVED_SUPPLY") {
               showErrorAlert({
                  title: "Erro ao Mover a Toner para a Lixeira",
                  message: errMessage
               })
            }
         }
      }
   }


   useEffect(() => {
      setTitle("Tintas");
   }, []);

   return (
      <SupplyMain
         subTitle={"Consulta de Tintas"}
         actionData={actionList}
         supplyInfo={{
            data: filteredTintas,
            handleEdit: (id) => {
               showModal({
                  modalName: "editTinta",
                  customStyle: { overflow: "initial" },
                  data: { id },
               });
            },
            handleDelete: handleDeleteTinta,
            isLoading,
            searchValue,
            setSearchValue,
            getAllSuppliesByMarca: getAllTintasByMarca
         }}
      />
   );
}
