import React from 'react'
import Phonebg from './Phonebg_space'
import foodLogo from '../src/foodbank-images/foodbank-logo.png'

export default function Resetpd() {
  return (
    <main className="reg-main">
        <div className="reg-form-space">
            <img src={foodLogo} alt="" className="reg-logo" />
            <h2 className="registration-subheading">
                Reset Password
            </h2>
            <p className="regristration-descriptive-text">
                We've sent a code to <span>helloworld@gmail.com</span>
            </p>
            <form action="" className="registration-form">
                <div className="otp-inputs">
                    <input type="tel" name="" id="" />
                    <input type="tel" name="" id="" />
                    <input type="tel" name="" id="" />
                    <input type="tel" name="" id="" />
                </div>
                <button type='submit' className='reg-form-btn'>Reset password</button>
            </form>
        </div>
        <Phonebg></Phonebg>
    </main>
  )
}
