import axios from 'axios';
import React, { useRef, useState } from 'react'
import { useHistory,Link, Redirect } from 'react-router-dom';
import './Register.scss'
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setusername] = useState("");

  const emailRef = useRef();
  const passwordRef = useRef();
  const usernameRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  const hisrty = useHistory();

  const handleFinish = async (e) => {
    console.log("log")
    e.preventDefault()
    setPassword(passwordRef.current.value);
    setusername(usernameRef.current.value)
try {
  const res = await axios.post('auth/register', { email, username,password })
  console.log(res)
  hisrty.push('/login')
} catch (error) {
  console.log(error)
}
  
  };
  return (
    <div className="register">
      <div className="top">
        <div className="wrapper">
          <img
            className="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
      

           <button   style={{cursor:"pointer"}}> sign up </button>
        </div>
        <Link to='/login' style={{color:"white"}}>link</Link>
      </div>
      <div className="container">
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className="input">
            <input type="email" placeholder="email address" ref={emailRef} />
            <button className="registerButton" onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className="input">
            <input type="password" placeholder="password" ref={passwordRef} />
            <input type="text" placeholder="username" ref={usernameRef} />
            <button className="registerButton" onClick={handleFinish}>
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Register
