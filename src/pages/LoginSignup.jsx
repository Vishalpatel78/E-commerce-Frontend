import React from 'react'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
    return (
        <div className='loginsignup'>
            <div className="loginsignup-container">
                <h1>Sign up</h1>
                <div className="loginsignup-fields">
                    <input type="text" placeholder='Your Name'/>
                    <input type="email" placeholder='Your Email Address'/>
                    <input type="password" placeholder='Password'/>
                </div>
                <button>Continue</button>
                <p className="loginsignup-login">
                    Already have an account <span>Login here</span>
                    <div className="loginsignup-agree">
                        <input type="checkbox" name="" id=""/>
                        <p>By continuing , i agreee to the terms of use & privacy policy</p>
                    </div>
                </p>
            </div>

        </div>
    )
}

export default LoginSignup