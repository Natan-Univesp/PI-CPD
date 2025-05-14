import React from "react";
import PropTypes from "prop-types";
import styles from "./Action.module.css";

export default function ActionContent({ icon, text, placeholder, handleOpenModal }) {
   return (
      <div
         className={styles.action__content}
         data-placeholder={placeholder}
         data-placeholderresponsive={text}
         onClick={handleOpenModal}
      >
         <div className={styles.action__content__front}>
            <div className={styles.action__content__icon}>
               {icon && React.cloneElement(icon, { className: styles.iconCover })}
            </div>
            <p className={styles.action__content__title}>{placeholder}</p>
         </div>
         <p className={styles.action__content__backText}>{text}</p>
      </div>
   );
}

ActionContent.propTypes = {
   icon: PropTypes.element,
   text: PropTypes.string,
   placeholder: PropTypes.string,
   handleOpenModal: PropTypes.func,
};
