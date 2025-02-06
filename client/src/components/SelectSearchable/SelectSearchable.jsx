import Select from 'react-select';
import PropTypes from "prop-types";

export default function SelectSearchable({dataOptions, textView, placeholder, defaultValue}) {
    const customStyles = {
        placeholder: (baseStyles) => ({
            ...baseStyles,
            color: "var(--colorInactive)",
            fontFamily: "var(--fontPrim)"
        }),
        control: (baseStyles) => ({
            ...baseStyles,
            marginTop: "3px",
            padding: "4px",
            borderRadius: "3px",
            backgroundColor: "var(--colorPrim)",
            borderWidth: 0,
            boxShadow: "none",
            fontFamily: "var(--fontSec)",

        }),
        option: (baseStyles, state) => ({
            ...baseStyles,

            fontFamily: "var(--fontSec)",
            fontWeight: 400,
            cursor: state.isFocused && "pointer"
        })
    }

    const customThemes = (theme) => ({
        ...theme,
        colors: {
            ...theme.colors,
            primary: "black",
            primary25: "rgb(245, 245, 245)",
            primary50: "var(--colorInactive)",
        }
    })

    return(
        <div className="selectContainer">
            <h4>{textView}</h4>
            <Select theme={customThemes} styles={customStyles} options={dataOptions} placeholder={placeholder} defaultValue={defaultValue}/>
        </div>
    )
}

SelectSearchable.propTypes = {
    dataOptions: PropTypes.array,
    textView: PropTypes.string,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.object
}