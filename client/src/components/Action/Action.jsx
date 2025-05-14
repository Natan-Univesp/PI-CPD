import PropTypes from 'prop-types';
import styles from './Action.module.css';
import ActionContent from './ActionContent';

export default function Action({actionList}) {
    return (
        <div className={`${styles.action__container} fadeIn`}>
            {actionList.map(item => <ActionContent key={item.id} {...item}/>)}
        </div>
    )
}

Action.propTypes = {
    actionList: PropTypes.array
}