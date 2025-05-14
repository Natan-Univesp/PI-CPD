import PropTypes from "prop-types";
import styles from "./ContainerFilterButton.module.css";

export default function ContainerFilterButton({children, customClass = ""}) {
    return(
        <div className={`${styles.btnFilterContainer} ${customClass}`}>
            {children}
        </div>
    )
}

ContainerFilterButton.propTypes = {
    children: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.arrayOf(PropTypes.element)
              ]),
    customClass: PropTypes.string
}