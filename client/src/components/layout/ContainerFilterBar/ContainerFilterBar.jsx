import PropTypes from "prop-types";
import styles from "./ContainerFilterBar.module.css"

export default function ContainerFilterBar({children, customClass = ""}) {
    return(
        <div className={`${styles.filterBarContainer} ${customClass}`}>
            {children}
        </div>
    )
}

ContainerFilterBar.propTypes = {
    children: PropTypes.oneOfType([
                PropTypes.element,
                PropTypes.arrayOf(PropTypes.element)
              ]),
    customClass: PropTypes.string
}