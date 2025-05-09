import PropTypes from 'prop-types';
import styles from './TonerInfo.module.css';

function Toner({ title, buttonLabel, alt, list, img, text, availability }) {
  return (
    <div className={styles.tonner}>
      <div className={styles.actions}>
        <button className={styles.btnEditar}>{buttonLabel}</button>
        <button className={styles.btnExcluir}>{buttonLabel}</button>
      </div>
      <img src={img} alt={alt} className={styles.logo} />
      <h2>{title}</h2>
      <p>{text}</p>
      <ul className={styles.modelos}>
        <li>{list}</li>
      </ul>
      <p className={styles.disponibilidade}>{availability}</p>
    </div>
  );
}

Toner.propTypes = {
  buttonLabel: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  availability: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.string),
  alt: PropTypes.string,
  img: PropTypes.string,
};

export default Toner;
