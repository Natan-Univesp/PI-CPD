//Assim eu faço a exportação do meu arquivo CSS
//OBS: todos os "componentes" devem ter o seu css único seguindo a estrutura de "nome.module.css"
// a aplicação da estilização com classes estão indicadas no exemplo abaixo (é um pouco diferente do HTML e CSS padrão)
import styles from "./CardSupply.module.css";

export function CardSupply() {
    return(
        <>
            <p className={styles.example}>Aqui será o local onde poderá ser adicionado todo o html de estruturação do Card de Ação</p>
        </>
    )
}