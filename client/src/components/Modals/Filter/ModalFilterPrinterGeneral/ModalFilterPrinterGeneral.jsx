import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import InputRadio from "../../../Input/InputRadio/InputRadio";
import styles from "./ModalFilterPrinterGeneral.module.css";

export function ModalFilterPrinterGeneral() {
    const {
        register,
        handleSubmit,
        formState: { isDirty },
    } = useForm({ defaultValues: { orderBy: "", acao: "" } });

    const registerOrderBy = register("orderBy");
    const registerAcao = register("acao");

    const handleApplyFilter = (data) => {
        console.log(data);
    };

    return (
        <form
            action=""
            className={styles.modalFilterContainer}
            onSubmit={handleSubmit(handleApplyFilter)}
        >
            <div className={styles.modalFilterContent}>
                <div className={styles.modalFilterContent__orderByOptionsCollection}>
                    <h2>Ordernar Por:</h2>
                    <hr />
                    <div className={styles.inputCollectionColumn}>
                        <InputRadio
                            id={"desc"}
                            value="desc"
                            textView={"Mais Recentes"}
                            register={registerOrderBy}
                        />
                        <InputRadio
                            id={"asc"}
                            value="asc"
                            textView={"Mais Antigos"}
                            register={registerOrderBy}
                        />
                    </div>
                </div>
                <div className={styles.modalFilterContent__filterOptionsCollection}>
                    <h2>Opções de Filtragem:</h2>
                    <hr />
                    <div className={styles.filterOptionsCollection__filterOptions}>
                        <h3>Ação</h3>
                        <div className={styles.inputCollectionRow}>
                            <InputRadio
                                id={"aquisicao"}
                                value={"Aquisição"}
                                textView={"Aquisição"}
                                register={registerAcao}
                            />
                            <InputRadio
                                id={"alocacao"}
                                value={"Alocação"}
                                textView={"Alocação"}
                                register={registerAcao}
                            />
                            <InputRadio
                                id={"baixa"}
                                value={"Baixa"}
                                textView={"Baixa"}
                                register={registerAcao}
                            />
                            <InputRadio
                                id={"sendManut"}
                                value={"Envio para Manutenção"}
                                textView={"Envio para Manutenção"}
                                register={registerAcao}
                            />
                            <InputRadio
                                id={"returnManut"}
                                value={"Retorno da Manutenção"}
                                textView={"Retorno da Manutenção"}
                                register={registerAcao}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.modalFilterButton}>
                <button className={!isDirty ? "buttonForm-style1__inactive" : ""}>
                    Aplicar Filtros
                </button>
            </div>
        </form>
    );
}

ModalFilterPrinterGeneral.propTypes = {
    reportType: PropTypes.string,
};
