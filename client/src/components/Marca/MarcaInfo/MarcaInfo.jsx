import { MdOutlineCreateNewFolder as IconAdd } from "react-icons/md";

import { useModal } from "../../../Context/ModalContext";
import Action from "../../Action/Action";
import { CardMarca } from "../CardMarca/CardMarca";
import { useMarca } from "../../../Context/MarcaContext";
import { Loading } from "../../Loading/Loading";

export function MarcaInfo() {
   const { showModal } = useModal();
   const { marcas, setMarcas, isLoading } = useMarca();

   const actionListCollection = [
      {
         id: 1,
         icon: <IconAdd />,
         text: "Adicionar Marca",
         placeholder: "ADICIONAR",
         handleOpenModal: () => showModal({ modalName: "addMarcaSupply", data: {setMarcas} }),
      },
   ];

   return (
      <>
         <h2 className="subTitle">Ações</h2>
         <Action actionList={actionListCollection} />
         <h2 className="subTitle">Todas as Marcas</h2>
         {isLoading ? (
            <Loading />
         ) : (
            <div className="layoutFlexCollectionCard">
               {marcas.length === 0
                  ? <p className="textInfoNotAvaliable">Nenhuma marca cadastrada</p>
                  : marcas.map((info) => (
                       <CardMarca key={info.id} cardData={info} handleOpenModal={showModal} />
                    ))}
            </div>
         )}
      </>
   );
}
