import PropTypes from "prop-types";
import styles from "./TextArea.module.css";

export function TextArea({type = "text", name = "", id = "", value, placeholder = "", textView = "", handleOnChange}) {
    return(
        <div className={styles.textAreaContainer}>
            <label htmlFor={id}>{textView}</label>
            <textarea type={type} 
                  name={name} 
                  id={id}
                  value={value}
                  placeholder={placeholder}
                  onChange={handleOnChange}
                  required></textarea>
        </div>
    )
}

TextArea.propTypes = {
    type: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    placeholder: PropTypes.string,
    textView: PropTypes.string,
    handleOnChange: PropTypes.func
}