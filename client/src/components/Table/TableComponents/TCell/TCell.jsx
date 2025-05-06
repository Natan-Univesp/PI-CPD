import PropTypes from 'prop-types';


export default function TCell({indexValue, fieldValue}) {
    return(
        <td key={indexValue}>
            <p>{fieldValue}</p>
        </td>
    )
}

TCell.propTypes = {
    indexValue: PropTypes.number,
    fieldValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
}