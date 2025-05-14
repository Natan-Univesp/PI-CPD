import PropTypes from "prop-types";
import { FaCheck as IconCheck} from "react-icons/fa";
import styles from "./InputCheckNormal.module.css";

export default function InputCheckNormal({ id, value = "", register = {}, textView = "", error}) {
    return(
        <div className={`${styles.inputCheckContainer} ${(error) ? styles.inputCheckError : ""}`}>
            <input type="checkbox" id={id} {...register} value={value}/>
            <span className={styles.inputCheck__checkbox}>
                <IconCheck className={styles.checkbox__icon}/>
            </span>
            <label htmlFor={id}>{textView}</label>
        </div>
    )
}

InputCheckNormal.propTypes = {
    id: PropTypes.string,
    value: PropTypes.string,
    register: PropTypes.object,
    textView: PropTypes.string,
    error: PropTypes.object
}
