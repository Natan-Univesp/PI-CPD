import { useEffect, useState } from "react";
import PropTypes from "prop-types";

//Icones
import { FaCheck as IconCheck} from "react-icons/fa";
import { IoAlert as IconAlert} from "react-icons/io5";
import { FaXmark as IconImportant} from "react-icons/fa6";

import styles from "./ModalMessage.module.css";

export default function ModalMessage({modalTypeSelect, modalTitle, modalText, modalAction}) {
    const [modal, setModal] = useState([]);

    const modalOptions = [
        {id: 1, type: "success", icon: <IconCheck/>, modalClass: "modalSuccess"},
        {id: 2, type: "alert", icon: <IconAlert/>, modalClass: "modalAlert"},
        {id: 3, type: "important", icon: <IconImportant/>, modalClass: "modalImportant"}
    ]

    useEffect(() => {
        const modalSelected = modalOptions.filter(modalInfo => modalTypeSelect === modalInfo.type)[0]
        setModal(modalSelected);

    }, [])

    return (
        <div className={styles.modalMessage__cover}>
            <div className={`${styles.modalMessageContainer} ${styles[modal.modalClass]} fadeIn`}>
                <div className={styles.modalMessageContent__header}>
                    {modal.icon}
                </div>
                <div className={styles.modalMessageContent__info}>
                    <h1 className={styles.info__title}>{modalTitle}</h1>
                    <p className={styles.info__text}>{modalText}</p>
                    <hr />
                    <div className={styles.info__btnCollection}>
                        {modal.type !== "success" && <button className={styles.btnCollection__btnCancel}>Cancelar</button>}
                        <button className={styles.btnCollection__btnConfirm} onClick={modalAction}>OK</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

ModalMessage.propTypes = {
    modalTypeSelect: PropTypes.string,
    modalTitle: PropTypes.string,
    modalText: PropTypes.string,
    modalAction: PropTypes.func
}