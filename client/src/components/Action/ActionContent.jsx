import React from "react"
import PropTypes from 'prop-types';
import styles from '../../assets/css/Action.module.css';

export default function ActionContent({icon, text, placeholder, handleOpenModal}) {
    return (
        <div className={styles.action__content} onClick={handleOpenModal}>
            <div className={styles.action__cover} data-placeholder={placeholder} data-placeholderresponsive={text}>
                {icon && React.cloneElement(icon, {className: styles.iconCover})}
            </div>
            <p>{text}</p>
        </div>
    )
}

ActionContent.propTypes = {
    icon: PropTypes.element,
    text: PropTypes.string,
    placeholder: PropTypes.string,
    handleOpenModal: PropTypes.func
}