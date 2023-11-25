import React, { useState } from 'react'
import Phonebg from './Phonebg_space';
import { useNavigate } from 'react-router-dom';
import './App.css'
import axios from 'axios';
import { useUser } from './UserContext';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const { updateUserInfo } = useUser();
  const [fullName, setFullName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [isApproved, setIsApproved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Please enter both email and password');
      return;
    }

    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));


      const response = await fetch('https://api.sovereigntechltd.com/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        const userId = data.id
        const userEmail = data.user
        const userToken = data.token

        sessionStorage.setItem('userToken', data.token);
        sessionStorage.setItem('userId', data.id);
        if (data.approve === true && data.payment === true) {

          try {
            const apiUrl = `https://api.sovereigntechltd.com/api/v1/users/${userId}`;

            const response = await axios.get(apiUrl, {
              headers: {
                Authorization: `Bearer ${userToken}`,
              },
            });

            if (response.data && response.data.fullname && response.data.isApproved) {
              setLoading(false);
              setFullName(response.data.fullname);
              setUserImage(response.data.image);
              const isApproved = response.data.isApproved
              sessionStorage.setItem('isApproved', isApproved);
              updateUserInfo({
                fullName: response.data.fullname,
                userImage: response.data.image
              });
              navigate('/Dashboard');
            } else {
              console.error('Failed to fetch user details');
            }

          } catch (error) {
            console.log('')
          }
        } else if (data.approve === true && data.payment === false) {
          setLoading(false);
          navigate('/Payment', {state:{userId,userEmail}})
        } else {
          setLoading(false);
          navigate('/Dashboard')
        }



      } else {

        if (response.status === 400) {
          alert('Invalid email or password');
          setLoading(false);
        } else {
          alert('Login failed:', response.statusText);
          setLoading(false);
        }
      }
    } catch (error) {
      alert('Error during login:', error.message);
      setLoading(false);
    }

  };


  return (
    <main className="reg-main">
      <div className="reg-form-space">
        <img src="foodbank-images/foodbank-logo.png" alt="" className="reg-logo" />
        <h2 className="registration-subheading">
          Welcome back
        </h2>
        <p className="regristration-descriptive-text">
          Great to see you again!  Your journey continues here.
        </p>
        <form onSubmit={handleSubmit} className="registration-form">

          <section className='reg-setup-section'>
            <label htmlFor="">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder='Enter your correct email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </section>
          <section className='reg-setup-section'>
            <label htmlFor="">
              Password
            </label>
            <div className="reg-password-space">
              <input
                type="password"
                id="password"
                placeholder='Choose a password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <figure className='reg-eye-icon'>
                <img src="foodbank-images/eye.png" alt="" />
              </figure>
            </div>
          </section>
          <a href="/Forgotpd" className='reg-forgot-pd'>
            Forgot password?
          </a>{/* Overlay with loading spinner when loading is true */}
          {loading && (
            <div className="preloader-overlay">
              <div className="preloader"></div>
            </div>
          )}
          <button type='submit' className='reg-form-btn' disabled={loading}>
            Continue
          </button>
          <span className='reg-form-sign-space'>
            <p>Don't have an account? </p>
            <a href="/">Create account</a>
          </span>
        </form>
      </div>
      <Phonebg></Phonebg>
    </main>
  )
}
