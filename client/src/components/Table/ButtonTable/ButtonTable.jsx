import PropTypes from 'prop-types';
import styles from './ButtonTable.module.css';

export default function ButtonTable({infoView, handleAction, classBtn}) {
    return(
        <button type="button" onClick={handleAction} className={`${styles[classBtn]} ${styles.btnTable} fadeIn`}>{infoView}</button>
    )
}

ButtonTable.propTypes = {
    infoView: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
    textView: PropTypes.string,
    handleAction: PropTypes.func,
    classBtn: PropTypes.string
}