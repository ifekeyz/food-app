import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className='foodbank-footer'>
        <img src="foodbank-images/foodbank-logo2.png" alt="" className="footer-logo" />
        <div className="ff-links">
            <Link to={''}>About</Link>
            <Link to={''}>Contact Us</Link>
            <Link to={''}>Services</Link>
        </div>
    </footer>
  )
}
