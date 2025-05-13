
//Assim eu faço a exportação do meu arquivo CSS
//OBS: todos os "componentes" devem ter o seu css único seguindo a estrutura de "nome.module.css"
// a aplicação da estilização com classes estão indicadas no exemplo abaixo (é um pouco diferente do HTML e CSS padrão)
// CardAction.js
// CardAction.js
// CardAction.js (componente permanece o mesmo)
import styles from "./CardAction.module.css";

export function CardAction({ icon, title, onClick }) {
  return (
    <button className={styles.card} onClick={onClick}>
      <div className={styles.iconContainer}>{icon}</div>
      <div className={styles.footer}>
        {title}
      </div>
    </button>
  );
}