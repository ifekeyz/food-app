import React from 'react';
import Phonebg from './Phonebg_space';

export default function Forgotpd() {
  return (
    <main className="reg-main">
        <div className="reg-form-space">
            <img src="foodbank-images/foodbank-logo.png" alt="" className="reg-logo" />
            <h2 className="registration-subheading">
                Forgot Password?
            </h2>
            <p className="regristration-descriptive-text">
                No worries, it happens to the best of us. <br/> We'll help you reset your password.
            </p>
            <form action="" className="registration-form">
                <section className='reg-setup-section'>
                    <label htmlFor="">
                        Email
                    </label>
                    <input type="email" placeholder='Enter your correct email address'/>
                </section>
                <button type='submit' className='reg-form-btn'>Continue</button>
            </form>
        </div>
        <Phonebg></Phonebg>
    </main>
  )
}
