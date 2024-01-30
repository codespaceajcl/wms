import React from 'react';
import './Input.css';

const Input = ({ field: { name, onBlur, onChange, value },
  form: { errors, touched, setFieldTouched }, placeholder, label, isRequired, type }) => {

  const hasError = errors[name] && touched[name];
  return (
    <div className='input_field'>
      <label>{label} <span>*</span> </label>
      <input placeholder={placeholder}
        // onBlur={() => {
        // setFieldTouched(name);
        // onBlur(name);
        // }}
        // style={hasError && { borderColor: "red" }}
        onChange={text => onChange(name)(text)}
        value={value}
        type={type || 'text'}
      />

      {hasError ? <p className='error_para'> {errors[name]} </p> : <p className='error_para' style={{ color: "transparent" }}> No error </p>}
    </div>
  )
}
export default Input  