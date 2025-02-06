import PropTypes from 'prop-types';

export default function InfoContent({styles, IconBox, infoBox="0", titleBox="Título não informado", classInfo}) {
    return(
        <div className={styles.infoExtra__content}>
            <div className={styles.content__title}>
                {IconBox && <IconBox className={styles.title__icon}/>}
                <p className={styles.title__text}>{titleBox}</p>
            </div>            
            <div className={styles[classInfo]}>
                <p>{infoBox}</p>
            </div>
            
        </div>
    )
}

InfoContent.propTypes = {
    styles: PropTypes.object.isRequired,
    IconBox: PropTypes.elementType,
    infoBox: PropTypes.string,
    titleBox: PropTypes.string,
    classInfo: PropTypes.string.isRequired,
    
}