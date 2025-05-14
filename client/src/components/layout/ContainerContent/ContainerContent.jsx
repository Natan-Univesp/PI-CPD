import PropTypes from 'prop-types';
import styles from './ContainerContent.module.css';

export default function ContainerContent({title, classContainer = "", children}){
    return(
        <section className={`${styles.containerContent} ${classContainer} fadeIn`}>
            <h2>{title}</h2>
            {children}
        </section>
        
            
    )
}

ContainerContent.propTypes = {
    title: PropTypes.string,
    children: PropTypes.oneOfType([
                PropTypes.element.isRequired,
                PropTypes.arrayOf(PropTypes.element.isRequired)
            ]),
    classContainer: PropTypes.string
}