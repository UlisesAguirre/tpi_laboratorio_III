import React from 'react'

const InputLogin = ({type, inputName, placeholder}) => {
  return (
    <div>
       <div className="form-logIn-input">
            <label className="form-input-label">
              {inputName}
            </label>
            <input
              className="form-input-input"
              type={type}
              name={inputName}
              placeholder={placeholder}
            ></input>
        </div>
    </div>
  )
}

export default InputLogin