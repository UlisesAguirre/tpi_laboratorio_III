import React from 'react'
import "./formLogIn.css"
import NavBar from "../NavBar/NavBar"


const FormLogIn = () => {
  return (
    <div>
        <NavBar/>
        <div class="LogIn">
            <div class="form">
                <h3 class="form-tittle form-all" >Log in</h3>
                <div class="form-input">
                    <label class="form-input-label" for="usuario">Email</label>
                    <input class="form-input-input" type="text" name="usuario" placeholder='example@gmail.com'></input>
                </div>
                <div class="form-input">
                    <label class="form-input-label" for="usuario">Password</label>
                    <input class="form-input-input" type="password" name="usuario" placeholder='**************'></input>
                    <a href="#" class="form-input-link" >Forget your paswword ?</a>
                </div>
                <div>
                    <button class="form-button" >Log-In</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormLogIn
