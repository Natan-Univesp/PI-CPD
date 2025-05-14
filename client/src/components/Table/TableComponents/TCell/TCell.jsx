import PropTypes from 'prop-types';


export default function TCell({indexValue, fieldValue}) {
    return(

        <td key={indexValue} className={Array.isArray(fieldValue) ? "tableContent__customField" : ""}>
            {Array.isArray(fieldValue) 
                ? <p>{fieldValue.map((value, index) => <span key={index}> {value}</span>)}</p>
                : <p>{fieldValue}</p>

            }
        </td>
    )
}

TCell.propTypes = {
    indexValue: PropTypes.number,
    fieldValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
}