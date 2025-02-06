import PropTypes from 'prop-types';


export default function TCell({indexValue, fieldName = "", fieldValue, customInfo = {}}) {
    return(
        (Object.keys(customInfo).length > 0 && fieldName === customInfo.fieldName) 
            ? <td key={indexValue}>
                <p className={customInfo?.classValidate(fieldValue)}>
                    {customInfo?.valueValidate(fieldValue)}
                </p>
              </td>
            : <td key={indexValue} className={Array.isArray(fieldValue) ? "tableContent__customField" : ""}>
                {Array.isArray(fieldValue) 
                    ? <p>{fieldValue.map((value, index) => <span key={index}> {value}</span>)}</p>
                    : <p>{fieldValue}</p>

                }
              </td>
    )
}

TCell.propTypes = {
    indexValue: PropTypes.number,
    fieldName: PropTypes.string,
    fieldValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]),
    customInfo: PropTypes.object
}