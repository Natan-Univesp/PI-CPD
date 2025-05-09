import PropTypes from 'prop-types';
import styles from './Card.module.css';

function Card({ image, alt, buttonLabel, label }) {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <button className={styles.bntEditarMarca} alt={alt}>
            {buttonLabel}
          </button>
          <img className={styles.img} src={image} alt={alt} />
          <h2>{label}</h2>
          <p>
            Suplimentos Cadastrados: <span className={styles.text}>{0}</span>
          </p>
        </div>
      </div>
    </>
  );
}

Card.propTypes = {
  image: PropTypes.string,
  alt: PropTypes.string,
  label: PropTypes.string,
  buttonLabel: PropTypes.string,
  className: PropTypes.string,
};

export default Card;
