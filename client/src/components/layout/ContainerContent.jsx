import PropTypes from 'prop-types';
import styles from '../../assets/css/ContainerContent.module.css';

export default function ContainerContent({title, content, classContainer = null}){
    return(
        <section className={`${styles.containerContent} ${classContainer} fadeIn`}>
            <h2>{title}</h2>
            {content}
        </section>
        
            
    )
}

ContainerContent.propTypes = {
    title: PropTypes.string,
    content: PropTypes.element.isRequired,
    classContainer: PropTypes.string
}