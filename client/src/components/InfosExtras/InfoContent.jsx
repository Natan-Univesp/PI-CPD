import PropTypes from 'prop-types';
import styles from "./InfoExtra.module.css";
import React from 'react';

export default function InfoContent({IconBox, infoBox, titleBox="Título não informado", classInfo}) {
    return(
        <div className={styles.infoExtra__content}>
            <div className={styles.content__title}>
                {IconBox && <IconBox className={styles.title__icon}/>}
                <p className={styles.title__text}>{titleBox}</p>
            </div>            
            <div className={styles[classInfo]}>
                {React.isValidElement(infoBox)
                    ? infoBox
                    : <p>{infoBox}</p>
                }
            </div>
            
        </div>
    )
}

InfoContent.propTypes = {
    IconBox: PropTypes.elementType,
    infoBox: PropTypes.oneOfType([
        PropTypes.element,
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.string,
        PropTypes.number
    ]),
    titleBox: PropTypes.string,
    classInfo: PropTypes.string.isRequired,
    
}