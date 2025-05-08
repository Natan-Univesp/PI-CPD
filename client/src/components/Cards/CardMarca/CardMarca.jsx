import styles from './CardMarca.module.css';

export function CardMarca() {
  return (
    <section>
      <div className={`${styles.container}`}>
        <div className={`${styles.card}`}>
          <button className={`${styles.btnEditarMarca}`}>EDITAR</button>
          <img src='../assets/img/hp-logo.svg' alt='Logo da HP' />
          <h2>HP</h2>
          <p>
            Suprimentos Cadastrados:{' '}
            <span className={`${styles.suprimentos}`}>0</span>
          </p>
        </div>

        <div className={`${styles.card}`}>
          <button className={`${styles.btnEditarMarca}`}>EDITAR</button>
          <img src='assets/img/brother-logo.svg' alt='Logo da Brother' />
          <h2>BROTHER</h2>
          <p>
            Suprimentos Cadastrados:{' '}
            <span className={`${styles.suprimentos}`}>0</span>
          </p>
        </div>

        <div className={`${styles.card}`}>
          <button className={`${styles.btnEditarMarca}`}>EDITAR</button>
          <img src='assets/img/canon-logo.svg' alt='Logo da Canon' />
          <h2>CANON</h2>
          <p>
            Suprimentos Cadastrados:{' '}
            <span className={`${styles.suprimentos}`}>0</span>
          </p>
        </div>

        <div className={`${styles.card}`}>
          <button className={`${styles.btnEditarMarca}`}>EDITAR</button>
          <img src='assets/img/epson-logo.svg' alt='Logo da Epson' />
          <h2>EPSON</h2>
          <p>
            Suprimentos Cadastrados:{' '}
            <span className={`${styles.suprimentos}`}>0</span>
          </p>
        </div>

        <div className={`${styles.card}`}>
          <button className={`${styles.btnEditarMarca}`}>EDITAR</button>
          <img src='assets/img/lexmark-logo.svg' alt='Logo da Lexmark' />
          <h2>LEXMARK</h2>
          <p>
            Suprimentos Cadastrados:{' '}
            <span className={`${styles.suprimentos}`}>0</span>
          </p>
        </div>

        <div className={`${styles.card}`}>
          <button className={`${styles.btnEditarMarca}`}>EDITAR</button>
          <img src='./assets/samsung-logo.svg' alt='Logo da Samsung' />
          <h2>SAMSUNG</h2>
          <p>
            Suprimentos Cadastrados:{' '}
            <span className={`${styles.suprimentos}`}>0</span>
          </p>
        </div>
      </div>
    </section>
  );
}
