import PropTypes from "prop-types";
import styles from "./CardMarca.module.css";
import { useMarca } from "../../../Context/MarcaContext";

export function CardMarca({ cardData = {}, handleOpenModal }) {
   const { setMarcas } = useMarca();
   const serverImage = import.meta.env.VITE_SERVER_UPLOADS;

   return (
      <div className={`${styles.card} fadeIn`} id={cardData.id}>
         <button
            className={styles.btnEditarMarca}
            onClick={() =>
               handleOpenModal({
                  modalName: "editMarcaSupply",
                  data: { id: cardData.id, setMarcas },
               })
            }
         >
            EDITAR
         </button>
         <img src={`${serverImage}/${cardData.img}`} alt="Imagem da categoria da impressora" />
         <h4>{cardData.marca.toUpperCase()}</h4>
         <p>
            Suprimentos Cadastrados: <span className={styles.suprimentos}>{cardData.supplies_registered}</span>
         </p>
      </div>
   );
}

CardMarca.propTypes = {
    cardData: PropTypes.object,
    handleOpenModal: PropTypes.func
}
