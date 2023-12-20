import React from "react";
import Select from "react-select";

// control: (baseStyles, state) => ({
//     ...baseStyles,
//     borderColor: errors[name] && touched[name] ? 'red' : (state.isFocused || state.isHovered || state.isActive || state.onHovered ? '#A9C23F' : '#bec0c3')
// })

const SelectField = ({
    options,
    field: { onChange, value, name },
    form: { errors, touched },
    styleCss,
    placeholder,
}) => (
    <>
        <Select
            options={options}
            styles={styleCss}
            placeholder={placeholder}
            name={name}
            value={options ? options.find(option => option.value === value) : ''}
            onChange={option => onChange(name)(option.value)}
        />
        {errors[name] && touched[name] ? <p className='error_para'> {errors[name]} </p> :
            <p className='error_para' style={{ color: "transparent" }}> No error </p>}
    </>
)

export default SelectField;