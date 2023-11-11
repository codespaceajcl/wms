import React from 'react';
import './Input.css';

const Input = ({ label, placeholder, isRequired, type }) => {
  return (
    <div className='input_field'>
      <label>{label} {isRequired ? <span>*</span> : null} </label>
      <input placeholder={placeholder} type={type} />
    </div>
  )
}
export default Input