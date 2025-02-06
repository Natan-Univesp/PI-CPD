import PropTypes from 'prop-types';
import styles from "./InputCheck.module.css";

export default function InputCheck({name, id, textView, handleOnChange}) {
    return(
        <div className={styles.inputCheck__container}>
            <input type="checkbox" name={name} id={id} onChange={handleOnChange}/>
            <label htmlFor={name}>{textView}</label>
        </div>
    )
}

InputCheck.propTypes = {
    name: PropTypes.string,
    id: PropTypes.string,
    textView: PropTypes.string,
    handleOnChange: PropTypes.func
}