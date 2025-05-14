import PropTypes from "prop-types";

export function TCellInput({inptType, inptName, inptId, inptValue = "", handleOnChange, customStyleInpt = {}}) {
    return(
        <td>
            <input type={inptType} 
                   name={inptName} 
                   id={inptId} 
                   value={inptValue}
                   onChange={handleOnChange}
                   onWheel={e => e.target.blur()}
                   style={customStyleInpt}/>
        </td>
    )
}

TCellInput.propTypes = {
    inptType: PropTypes.string.isRequired,
    inptName: PropTypes.string.isRequired,
    inptId: PropTypes.oneOfType([
                PropTypes.string, 
                PropTypes.number
            ]).isRequired,
    inptValue: PropTypes.oneOfType([
                PropTypes.string, 
                PropTypes.number
            ]),
    handleOnChange: PropTypes.func.isRequired,
    customStyleInpt: PropTypes.object
}