import PropTypes from 'prop-types';
import styles from './InputRadio.module.css';

export default function InputRadio({id, handleOnChange, textView, ...rest}) {

    return(
        <div className={styles.optionContent}>
            <input type="radio" id={id} {...rest} onChange={handleOnChange}/>
            <span className={styles.customRadio}></span>
            <label htmlFor={id}>{textView}</label>
        </div>
    )
}

InputRadio.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string,
    checked: PropTypes.bool,
    handleOnChange: PropTypes.func,
    textView: PropTypes.string
}