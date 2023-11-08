import React from 'react';
import './Input.css';

const Input = ({ label }) => {
  return (
    <div className='input_field'>
      <label>{label}</label>
      <input />
    </div>
  )
}
export default Input