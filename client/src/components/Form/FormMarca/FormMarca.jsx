import styles from "./FormMarca.module.css";

export function FormMarca() {
    return(
        <form action="">
            <p className={styles.example}>Aqui será o formulário de suprimentos.</p>
            <p>Eventualmente eu separarei um formulário para cada suprimento (toner, cilindro e tinta)</p>
        </form>
    )
}