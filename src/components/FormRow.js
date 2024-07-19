import React from 'react'

const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className='form-row'>
      <div style={{ display: "flex", justifyContent: "space-between" }}><label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
        {name === "status" ? <div>pending/interview/declined</div> : ""}</div>
      <input
        id={name}
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className='form-input'
      />
    </div>
  );
}

export default FormRow
