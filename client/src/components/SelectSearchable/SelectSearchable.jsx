import Select from 'react-select';
import PropTypes from "prop-types";
import { Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { Loading } from '../Loading/Loading';

export default function SelectSearchable({controlName = "", control, dataOptions, textView, placeholder, error}) {
    const [isLoadedData, setIsLoadedData] = useState(false);

        
    const findAndDefineValue = (dataOptions, value) => {
        if(value === null || value === undefined) {
            return null;
        }


        const optionValue = dataOptions.find((option) => {
            if(Array.isArray(option.value)) {
                const subOptions = option.value;
                return findAndDefineValue(subOptions, value);
            }
            return option.value === Number(value);
        })
        return optionValue;
    }

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
            border: (error) ? "1px solid var(--colorRed)" : "",
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

    useEffect(() => {
        const hasOptions = Array.isArray(dataOptions);
        setIsLoadedData(hasOptions)

    }, [dataOptions])

    const customThemes = (theme) => ({
        ...theme,
        colors: {
            ...theme.colors,
            primary: "black",
            primary25: "rgb(245, 245, 245)",
            primary50: "var(--colorInactive)",
        }
    })

    if(!isLoadedData) return <Loading/>

    return(
        <div className="selectContainer">
            <h4 style={(error) ? {color: "var(--colorRed)"} : {}}>{textView}</h4>
            <Controller name={controlName}
                        control={control}
                        rules={{
                            required: "Campo Obrigatório"
                        }}
                        render={({field: {onChange, onBlur, value}}) => {
                            return <Select theme={customThemes} 
                                    styles={customStyles} 
                                    options={dataOptions} 
                                    placeholder={placeholder} 
                                    value={findAndDefineValue(dataOptions, value)}
                                    onChange={(({value}) => onChange(value))}
                                    onBlur={onBlur}/>
                        }}/>
            {error && <span className='errorMessage'>{error.message}</span>}
        </div>
    )
}

SelectSearchable.propTypes = {
    controlName: PropTypes.string,
    control: PropTypes.object,
    dataOptions: PropTypes.array,
    textView: PropTypes.string,
    placeholder: PropTypes.string,
    defaultValue: PropTypes.object,
    error: PropTypes.object
}