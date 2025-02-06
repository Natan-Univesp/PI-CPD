import PropTypes from "prop-types";
import styles from './InfoExtra.module.css';
import InfoContent from './InfoContent.jsx';

export default function InfoExtra({infoBoxExtra=[]}) {
    return(
        <div className={`${styles.infoExtra} fadeIn`}>
            {infoBoxExtra.map(info => {
                return(
                    <InfoContent key={info.id} styles={styles} {...info}/>
                )
            })}
        </div>
    )
}

InfoExtra.propTypes = {
    infoBoxExtra: PropTypes.array
}