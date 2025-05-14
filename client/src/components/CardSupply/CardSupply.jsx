import PropTypes from 'prop-types';
import styles from "./CardSupply.module.css";

//Ícones
import { FaEdit as IconEdit, FaTrashAlt as IconDel} from "react-icons/fa";
import { stringToArray } from '../../utils/ManipulateDataUtil';
import { useAlert } from '../../Context/AlertContext';

export default function CardSupply({supply, handleEdit, handleDelete}) {
    const { showConfirmAlert } = useAlert();
    const printerCompat = stringToArray(supply.printer_compat);
    const serverImg = import.meta.env.VITE_SERVER_UPLOADS;

    const handleConfirmDelete = async (id) => {
        await showConfirmAlert({
            title: "Mover para a Lixeira",
            message: "Você tem certeza que deseja mover o Suprimento para a lixeira? (Esta ação poderá ser desfeita)",
            handleConfirm: async () => await handleDelete(id)
        })
    }

    return(
        <article className={`${styles.cardSupply__container} fadeIn`} id={supply.id}>
            <div className={styles.cardSupplyContent__btnActionCollection}>
                <button className={styles.btnEdit} title="Editar" onClick={() => handleEdit(supply.id)}>
                    <IconEdit/>
                </button>
                <button className={styles.btnDel} title="Excluir" onClick={async () => await handleConfirmDelete(supply.id)}>
                    <IconDel/>
                </button>
            </div>
            <div className={styles.cardSupplyContent__cover}>
                <img src={`${serverImg}/${supply.img}`} alt="marca_impressora" />
            </div>
            <h4 className={styles.cardSupplyContent__title}>{supply.modelo}</h4>
            <p className={styles.cardSupplyContent__text}>Impressoras Compatíveis:</p>
            <div className={styles.cardSupplyContent__info}>
                <p>
                    {printerCompat.map((printerInfo, index) => <span key={index}>{printerInfo}</span>)}
                </p>
            </div>
            <div className={styles.cardSupplyContent__qtd}>
                <p className={Number(supply.qtd) > 0 ? styles.avaliable : styles.notAvaliable}>
                    {Number(supply.qtd) > 0 ? "Disponível" : "Indisponível"}: {supply.qtd}
                </p>
            </div>
        </article>
    )
}

CardSupply.propTypes = {
    supply: PropTypes.object,
    handleEdit: PropTypes.func,
    handleDelete: PropTypes.func
}