import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './SubNav.module.css';

export function SubNav({navInfo}) {
    const [firstNavInfo, lastNavInfo] = navInfo;

    return(
        <nav className={styles.subNav}>
            <ul>
                <li><NavLink to={firstNavInfo.link} className={({isActive}) => isActive ? styles.active : ""} end>{firstNavInfo.text}</NavLink></li>
                <li><NavLink to={lastNavInfo.link} className={({isActive}) => isActive ? styles.active : ""}>{lastNavInfo.text}</NavLink></li>
            </ul>
            <div className={styles.subNav__activeContainer}></div>
        </nav>
    )
}

SubNav.propTypes = {
    navInfo: PropTypes.array.isRequired
}