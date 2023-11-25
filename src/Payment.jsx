/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const PaymentScreen = () => {
  const location = useLocation();
    const navigate = useNavigate();
    const userId= location.state && location.state.userId;
    console.log(userId)
    const userEmail = location.state && location.state.Email;

    
      useEffect(() => {
        // Redirect to Flutterwave payment link
        window.location.href = `https://sandbox-flw-web-v3.herokuapp.com/pay/guxe2k3vdh8b?userId=${userId}`;
      }, []); // Use an empty dependency array to run this effect only once on mount
    
      return null;
};

export default PaymentScreen;




