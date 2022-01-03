import React, { useContext, useState } from 'react'
import { login } from '../../Aurhcontext/API/APICALL'
import { AuthContext } from '../../Aurhcontext/Authcontext'
import './login.scss'
function Login() {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const { dispatch } = useContext(AuthContext)
  const handlesubmit = (e) => {
        console.log("log")
    e.preventDefault()
    login({email,password},dispatch)
  }
    return (
  <div className="login">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
        </div>
      </div>
      <div className="container">
   
                <form>
                    <h1>Sing In</h1>
            <input type="email" placeholder="Enter your email or phone number"
              value={email}
            onChange={(e)=>setemail(e.target.value)}
            />
                    <input type="password" value={password} placeholder="Enter your password" onChange={(e)=>setpassword(e.target.value)} />
                    <button className="loginbutton" onClick={handlesubmit} >
                        Sign In
                    </button>
                    <span>New to Netflix ?
                       <b>Sign up now</b>   </span>
                    <small>This page is protected by Google reCAPTCHA to ensuer you're not a bot. <b>Learn more</b></small>
       </form>
      </div>
    </div>
    )
}

export default Login
