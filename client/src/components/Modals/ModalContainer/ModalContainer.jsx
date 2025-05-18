import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./ModalContainer.module.css";

//Icones
import { IoClose as IconClose } from "react-icons/io5";

//Context
import { useModal } from "../../../Context/ModalContext";

//Componentes
//Filtragem
import { ModalFilterDefault } from "../Filter/ModalFilterDefault/ModalFilterDefault";
// Toner
import { ModalRegisterToner } from "../Toner/ModalRegisterToner/ModalRegisterToner";
import { ModalEditToner } from "../Toner/ModalEditToner/ModalEditToner";
// Cilindro
import { ModalRegisterCilindro } from "../Cilindro/ModalRegisterCilindro/ModalRegisterCilindro";
import { ModalEditCilindro } from "../Cilindro/ModalEditCilindro/ModalEditCilindro";
// Tinta
import { ModalRegisterTinta } from "../Tinta/ModalRegisterTinta/ModalRegisterTinta";
import { ModalEditTinta } from "../Tinta/ModalEditTinta/ModalEditTinta";
// Marca
import { ModalAddMarca } from "../Marca/ModalAddMarca/ModalAddMarca";
import { ModalEditMarca } from "../Marca/ModalEditMarca/ModalEditMarca";
// Administrador
import { ModalAddUser } from "../ModalAddUser/ModalAddUser";
// Atalhos
import { ModalAtalho } from "../ModalAtalho/ModalAtalho";
//Solicitação de Suprimentos (confirmação)
import { ModalConfirmSupplyRequest } from "../ModalConfirmSupplyRequest/ModalConfirmSupplyRequest";
import { ModalConfirmRetirada } from "../ModalConfirmRetirada/ModalConfirmRetirada";
import { ModalLixeiraToner } from "../Toner/ModalLixeiraToner/ModalLixeiraToner";
import { ModalLixeiraCilindro } from "../Cilindro/ModalLixeiraCilindro/ModalLixeiraCilindro";
import { ModalLixeiraTinta } from "../Tinta/ModalLixeiraTinta/ModalLixeiraTinta";
import { ModalReestoqueToner } from "../Toner/ModalReestoqueToner/ModalReestoqueToner";
import { ModalReestoqueCilindro } from "../Cilindro/ModalReestoqueCilindro/ModalReestoqueCilindro";
import { ModalReestoqueTinta } from "../Tinta/ModalReestoqueTinta/ModalReestoqueTinta";

export default function ModalContainer() {
    const { modalRef, closeModal } = useModal();

    const [modal, setModal] = useState();

    const modalCollection = [
        {
            name: "filterDefault",
            title: "Filtrar e Organizar",
            modalContent: <ModalFilterDefault />,
        },
        // Toners
        {
            name: "registerToner",
            title: "Cadastro de Novo Toner",
            modalContent: <ModalRegisterToner />,
        },
        {
            name: "editToner",
            title: "Editar Informações de Toner",
            modalContent: <ModalEditToner />,
        },
        {
            name: "lixeiraToner",
            title: "Lixeira de Toners",
            modalContent: <ModalLixeiraToner/>
        },
        {
            name: "reestoqueToner",
            title: "Reestoque de Toners",
            modalContent: <ModalReestoqueToner/>
        },
        //Cilindros
        {
            name: "registerCilindro",
            title: "Cadastro de Novo Cilindro",
            modalContent: <ModalRegisterCilindro />,
        },
        {
            name: "editCilindro",
            title: "Editar Informações de Cilindro",
            modalContent: <ModalEditCilindro />,
        },
        {
            name: "lixeiraCilindro",
            title: "Lixeira de Cilindros",
            modalContent: <ModalLixeiraCilindro/>
        },
        {
            name: "reestoqueCilindro",
            title: "Reestoque de Cilindros",
            modalContent: <ModalReestoqueCilindro/>
        },
        // Tintas
        {
            name: "registerTinta",
            title: "Cadastro de Novas Tintas",
            modalContent: <ModalRegisterTinta />,
        },
        {
            name: "editTinta",
            title: "Editar informações de Tinta",
            modalContent: <ModalEditTinta />,
        },
        {
            name: "lixeiraTinta",
            title: "Lixeira de Tintas",
            modalContent: <ModalLixeiraTinta/>
        },
        {
            name: "reestoqueTinta",
            title: "Reestoque de Tintas",
            modalContent: <ModalReestoqueTinta/> 
        },
        {
            name: "addMarcaSupply",
            title: "Adicionar Marca de Suprimento",
            modalContent: <ModalAddMarca />,
        },
        {
            name: "editMarcaSupply",
            title: "Editar Marca de Suprimento",
            modalContent: <ModalEditMarca />,
        },
        { name: "adminAddUser", title: "Cadastrar Novo Usuário", modalContent: <ModalAddUser /> },
        {
            name: "atalhoSupplySearch",
            title: "Consulta Rápida de Suprimentos",
            modalContent: <ModalAtalho />,
        },
        {
            name: "confirmRequestSupply",
            title: "Confirmação de Solicitação",
            modalContent: <ModalConfirmSupplyRequest/>
        },
        {
            name: "confirmRetiradaSupply",
            title: "Confirmação de Retirada",
            modalContent: <ModalConfirmRetirada/>
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
                            <IconClose className={styles.closeIcon} onClick={handleClickClose} />
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

ModalContainer.propTypes = {
    modalRequestName: PropTypes.string,
    handleClickModalClose: PropTypes.func,
    customStyle: PropTypes.object,
};
