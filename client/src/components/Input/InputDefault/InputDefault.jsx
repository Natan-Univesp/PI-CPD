import PropTypes from 'prop-types';
import styles from "./InputDefault.module.css";

export default function InputDefault({handleAction, textView, id, ...rest}) {
    return(
        <div className={styles.inputContainer}>
            <label htmlFor={id}>{textView}</label>
            <input id={id} {...rest} onChange={handleAction} required/>
        </div>
    )
}

InputDefault.propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    textView: PropTypes.string.isRequired,
    handleAction: PropTypes.func

}