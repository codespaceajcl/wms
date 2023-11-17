import React from 'react';
import './Input.css';

const Input = ({ label, placeholder, isRequired, type }) => {
  return (
    <div className='input_field'>
      <label>{label} {isRequired ? <span>*</span> : null} </label>

      {
        // type === 'Date' ?
        //   <div style={{ position: "relative" }}>
        //     <input placeholder={placeholder} type={type} />
        //     <img src='/images/calender_input_icon.png' alt='' className='calender_icon_handler' />
        //   </div> :
          <input placeholder={placeholder} type={type} />
      }
    </div>
  )
}
export default Input