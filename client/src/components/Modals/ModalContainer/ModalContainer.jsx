import { useEffect, useState } from "react";
import styles from "./ModalContainer.module.css";

//Icones
import { IoClose as IconClose } from "react-icons/io5";

//Context
import { useModal } from "../../../Context/ModalContext";

//Componentes
import { ModalRegisterToner } from "../Toner/ModalRegisterToner/ModalRegisterToner";
import { ModalRegisterCilindro } from "../Cilindro/ModalRegisterCilindro/ModalRegisterCilindro";
import { ModalRegisterTinta } from "../Tinta/ModalRegisterTinta/ModalRegisterTinta";
import { ModalRegisterUser } from "../ModalRegisterUser/ModalRegisterUser";
import { ModalRegisterMarca } from "../ModalRegisterMarca/ModalRegisterMarca";

export default function ModalContainer() {
    const { modalRef, closeModal } = useModal();

    const [modal, setModal] = useState();

    const modalCollection = [
        {
            name: "registerToner",
            title: "Cadastro de Novo Toner",
            modalContent: <ModalRegisterToner />,
        },
        {
            name: "registerCilindro",
            title: "Cadastro de Novo Cilindro",
            modalContent: <ModalRegisterCilindro/>
        },
        {
            name: "registerTinta",
            title: "Cadastro de Nova Tinta",
            modalContent: <ModalRegisterTinta/>
        },
        {
            name: "registerUser",
            title: "Cadastro de Usuário",
            modalContent: <ModalRegisterUser />,
        },
        {
            name: "registerMarca",
            title: "Adicionar Marca de Suprimentos",
            modalContent: <ModalRegisterMarca/>
        }
    ];

    const handleClickClose = () => {
        closeModal();
        setModal({});
    };

    useEffect(() => {
        const modalSelected = modalCollection.filter(
            (modal) => modal.name === modalRef.modalName
        )[0];
        setModal(modalSelected);
    }, [modalRef]);

    return (
        <div className={styles.modal__cover}>
            <div
                className={`${styles.modalContainer} activeModal fadeIn`}
                style={modalRef?.customStyle && modalRef.customStyle}
            >
                {modal ? (
                    <>
                        <span className={styles.modalContent__header}>
                            <h1>{modal.title}</h1>
                            <IconClose
                                className={styles.closeIcon}
                                onClick={handleClickClose}
                            />
                        </span>
                        <hr />
                        {modal.modalContent}
                    </>
                ) : (
                    <p>Modal Não encontrada</p>
                )}
            </div>
        </div>
    );
}
