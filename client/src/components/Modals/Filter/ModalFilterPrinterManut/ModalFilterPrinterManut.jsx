import { useForm } from "react-hook-form";
import InputRadio from "../../../Input/InputRadio/InputRadio";
import styles from "./ModalFilterPrinterManut.module.css";

export function ModalFilterPrinterManut() {
    const {
        register,
        handleSubmit,
        formState: { isDirty },
    } = useForm({ defaultValues: { orderBy: "", status: "" } });

    const registerOrderBy = register("orderBy");
    const registerStatus = register("status");

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
                                id={"sendManut"}
                                value={"Enviado para Manutenção"}
                                textView={"Envio para Manutenção"}
                                register={registerStatus}
                            />
                            <InputRadio
                                id={"returnManut"}
                                value={"Retornado da Manutenção"}
                                textView={"Retornado da Manutenção"}
                                register={registerStatus}
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