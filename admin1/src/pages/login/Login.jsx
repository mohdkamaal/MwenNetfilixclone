import React, { useContext, useState } from 'react'
import { login } from '../../context/Aurhcontext/API/APICALL'
import { AuthContext } from '../../context/Aurhcontext/Authcontext'
import  './Login.css'
function Login() {
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const { isFetching , dispatch}  = useContext(AuthContext)
    const handleClikc = async (e) =>
    {
        e.preventDefault();
        login({email,password},dispatch)
        }
    return (
        <div>
            <form action="" className="loginform">
                <div className="login">
                    <input type="text" className="logininput" value={email} onChange={e => setemail(e.target.value)} />
                    <input type="text" className="logininput" value={password} onChange={e=>setpassword(e.target.value)} />
                    <button className="loginbuuton" onClick={handleClikc} disabled={ isFetching}>Login</button>
                </div>
              
            </form>
        </div>
    )
}

export default Login
