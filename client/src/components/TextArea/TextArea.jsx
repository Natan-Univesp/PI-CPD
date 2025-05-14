import PropTypes from "prop-types";
import styles from "./TextArea.module.css";

export function TextArea({type = "text", id = "", placeholder = "", textView = "", register = {}, error}) {
    return(
        <div className={`${styles.textAreaContainer} ${(error) ? styles.textAreaError : ""}`}>
            <label htmlFor={id}>{textView}</label>
            <textarea type={type} 
                      id={id}
                      placeholder={placeholder}
                      {...register}></textarea>
            {error && <span className="errorMessage fadeIn">{error.message}</span>}
        </div>
    )
}

TextArea.propTypes = {
    type: PropTypes.string.isRequired,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    textView: PropTypes.string.isRequired,
    register: PropTypes.object.isRequired,
    error: PropTypes.object
}