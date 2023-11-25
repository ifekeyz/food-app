import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Phonebg from './Phonebg_space';
import "../src/foodbank-css/Registration.css";
import './App.css'

export default function Reg1() {
  // const [showPd,setShowPd] = useState(false)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);


  const parameter ={
    fullname : formData.firstName + ' ' + formData.lastName,
    email: formData.email,
    password:formData.password
  }


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      console.error('Password and Confirm Password do not match');
      return;
    }

    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = await fetch('https://api.sovereigntechltd.com/api/v1/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parameter),
      });

      if (response.status === 200) {
        // Handle success, e.g., redirect to another page
        console.log('User registered successfully');
        navigate('/RegOtp', { state: { userEmail: formData.email } });

      } else {
        // Handle error, e.g., display an error message
        console.error('Failed to register user');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }finally{
      setLoading(false);
    }
  };


  return (
    <main className="reg-main">
      <div className="reg-form-space">
        <img src="foodbank-images/foodbank-logo.png" alt="" className="reg-logo" />
        <h2 className="registration-subheading">
          Set up your profile
        </h2>
        <p className="regristration-descriptive-text">
          Personalize your experience by creating your profile today.
        </p>
        <form onSubmit={handleSubmit} className="registration-form">
          <section className='reg-setup-section'>
            <label htmlFor="firstName">
              First name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder='Enter your first name'
              value={formData.firstName}
              onChange={handleChange}
            />
          </section>
          <section className='reg-setup-section'>
            <label htmlFor="lastName">
              Last name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder='Enter your last name'
              value={formData.lastName}
              onChange={handleChange}
            />
          </section>
          <section className='reg-setup-section'>
            <label htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Enter your correct email address'
              value={formData.email}
              onChange={handleChange}
            />
          </section>
          <section className='reg-setup-section'>
            <label htmlFor="password">
              Password
            </label>
            <div className="reg-password-space">
              <input
                type="password"
                id="password"
                name="password"
                placeholder='Choose a password'
                value={formData.password}
                onChange={handleChange}
              />
              <figure className='reg-eye-icon'>
                <img src="foodbank-images/eye.png" alt="" />
              </figure>
            </div>
          </section>
          <section className='reg-setup-section'>
            <label htmlFor="confirmPassword">
              Confirm-password
            </label>
            <div className="reg-password-space">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder='Re-enter your password'
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <figure className='reg-eye-icon'>
                <img src="foodbank-images/eye.png" alt="" />
              </figure>
            </div>
          </section>
          {/* Overlay with loading spinner when loading is true */}
          {loading && (
            <div className="preloader-overlay">
              <div className="preloader"></div>
            </div>
          )}
          <button type='submit' className='reg-form-btn' disabled={loading}>
            Continue
          </button>
          <span className='reg-form-sign-space'>
            <p>Already have an account? </p>
            <a href="/Login">Sign in</a>
          </span>
        </form>
      </div>
      <Phonebg></Phonebg>
    </main>
  )
}
