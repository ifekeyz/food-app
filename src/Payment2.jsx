/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FlutterWaveButton, closePaymentModal } from 'flutterwave-react-v3';

export default function Payment2() {
    const location = useLocation();
    const navigate = useNavigate();
    const userId = location.state && location.state.userId;
    console.log(userId)
    const userEmail = location.state && location.state.Email;


    const [flutterwavePublicKey, setFlutterwavePublicKey] = useState(null);

    useEffect(() => {
        const fetchFlutterwavePublicKey = async () => {
            try {
                const response = await axios.get('https://api.sovereigntechltd.com/api/v1/admin/flutterwave-public-key');
                setFlutterwavePublicKey(response.data.publicKey);
            } catch (error) {
                console.error('Error fetching Flutterwave public key:', error);
            }
        };

        fetchFlutterwavePublicKey();
    }, []);


    const config = {
        public_key: flutterwavePublicKey,
        tx_ref: Date.now(),
        amount: 1000,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: userEmail,
            phone_number: '070888889',
            name: 'john doe',
        },
        customizations: {
            title: 'Food Bank',
            description: 'Payment for registration',
            logo: 'https://admin.sovereigntechltd.com/assets/img/logo.png',
        },
    };

    const fwConfig = {
        ...config,
        text: 'Pay with Flutterwave!',
        callback: (response) => {
            console.log(response);
            closePaymentModal() // this will close the modal programmatically
        },
        onClose: () => { },
    };

    return (
        <div className="App">
            <FlutterWaveButton {...fwConfig} />
        </div>
    );
}