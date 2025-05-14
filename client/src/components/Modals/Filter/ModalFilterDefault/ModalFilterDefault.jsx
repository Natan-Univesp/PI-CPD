import { useForm } from "react-hook-form";
import InputRadio from "../../../Input/InputRadio/InputRadio";
import styles from "./ModalFilterDefault.module.css";
import { useModal } from "../../../../Context/ModalContext";

export function ModalFilterDefault() {
    const { showDataInfo, closeModal } = useModal();
    const { filterParams, setFilterParams } = showDataInfo();
    const {
        register,
        handleSubmit,
        formState: { isDirty },
    } = useForm({ defaultValues: filterParams || { orderBy: "desc", setor: "" } });

    const registerOrderBy = register("orderBy");
    const registerSetor = register("setor");

    const handleApplyFilter = (filter) => {
        setFilterParams(filter);
        closeModal();
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
                        <h3>Setor</h3>
                        <div className={styles.inputCollectionRow}>
                            <InputRadio
                                id={"all"}
                                value={""}
                                textView={"Todos"}
                                register={registerSetor}
                            />
                            <InputRadio
                                id={"educacao"}
                                value={"Educação"}
                                textView={"Educação"}
                                register={registerSetor}
                            />
                            <InputRadio
                                id={"saude"}
                                value={"Saúde"}
                                textView={"Saúde"}
                                register={registerSetor}
                            />
                            <InputRadio
                                id={"social"}
                                value={"Social"}
                                textView={"Social"}
                                register={registerSetor}
                            />
                            <InputRadio
                                id={"outro"}
                                value={"Outro"}
                                textView={"Outro"}
                                register={registerSetor}
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
