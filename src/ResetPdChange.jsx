import React from 'react';
import Phonebg from './Phonebg_space';
import { useState } from 'react';
import Logo from '../src/foodbank-images/foodbank-logo.png';
import Eye from '../src/foodbank-images/eye.png';
import CheckImage from '../src/foodbank-images/check-img.png';
import { Link } from 'react-router-dom';

export default function ResetPdChange() {
    const [resetPd,setresetPd] = useState(false);
  return (
    <main className="reg-main">
        <div className="reg-form-space">
            <img src={Logo} alt="" className="reg-logo" />
            <h2 className="registration-subheading">
                Reset Password
            </h2>
            <p className="regristration-descriptive-text">
                We've sent a code to <span>helloworld@gmail.com</span>
            </p>
            <form action="" className="registration-form">
                <section className='reg-setup-section'>
                    <label htmlFor="">
                        New Password
                    </label>
                    <div className="reg-password-space">
                        <input type="password" placeholder='Choose a password'/>
                        <figure className='reg-eye-icon'>
                            <img src={Eye} alt="" />
                        </figure>
                    </div>
                </section>
                <p className="password-criteria">
                    Password must contain one symbol and one character
                </p>
                <section className='reg-setup-section'>
                    <label htmlFor="">
                        Confirm-password
                    </label>
                    <div className="reg-password-space">
                        <input type="password" placeholder='Re-enter your password'/>
                        <figure className='reg-eye-icon'>
                            <img src={Eye} alt="" />
                        </figure>
                    </div>
                </section>
                <div type='submit' className='reg-form-btn' onClick={() => {setresetPd(true)}}>Reset password</div>
            </form>
        </div>
        <Phonebg></Phonebg>
        {resetPd?<div className="verification-modal-bg" onClick={() => {setresetPd(false)}}>
            <div className="otp-verification-modal">
                <img src={CheckImage} alt="" className="otp-check-pic" />
                <h2>
                    Password changed
                </h2>
                <p>
                    Success! Your password has been updated.
                </p>
                <Link to="#" onClick={() => {setresetPd(false)}}>
                    Continue
                </Link>
            </div>
        </div>:null}
    </main>
  )
}
