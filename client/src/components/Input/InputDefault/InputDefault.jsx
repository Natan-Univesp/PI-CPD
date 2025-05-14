import PropTypes from 'prop-types';
import styles from "./InputDefault.module.css";

export default function InputDefault({type = "text", id = "", placeholder = "", textView = "", register = {}, error}) {
    return(
        <div className={`${styles.inputContainer} ${(error) ? styles.inputError : ""}`}>
            <label htmlFor={id}>{textView}</label>
            <input type={type}
                   id={id}
                   placeholder={placeholder}
                   onWheel={e => e.target.blur()}
                   {...register}/>
            {error && <span className={`errorMessage fadeIn`}>{error.message}</span>}
        </div>
    )
}

InputDefault.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    textView: PropTypes.string.isRequired,
    register: PropTypes.object.isRequired,
    error: PropTypes.object

}