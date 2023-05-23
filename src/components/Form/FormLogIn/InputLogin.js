import React from 'react'

const InputLogin = ({type, inputName, placeholder}) => {
  return (
    <div>
       <div class="form-input">
            <label class="form-input-label" for="usuario">
              {inputName}
            </label>
            <input
              class="form-input-input"
              type={type}
              name={inputName}
              placeholder={placeholder}
            ></input>
        </div>
    </div>
  )
}

export default InputLogin