import React from 'react';
import Phonebg from './Phonebg_space';
import "../src/foodbank-css/Registration.css";
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function RegOtp() {
    const [verify, setverify] = useState(false);
    const [otp, setOtp] = useState(['', '', '', '']);
    const location = useLocation();
    const navigate = useNavigate();
    const userEmail = location.state && location.state.userEmail;
    const [loading, setLoading] = useState(false);

    const handleChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
    };

    const handleSubmit = async () => {
        // Here, you should make a POST request to your verification endpoint
        // with userEmail and otp in the request body.
        // If verification is successful, setVerify(true).
        // Example:
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const response = await fetch('https://api.sovereigntechltd.com/api/v1/user/verify-code', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: userEmail,
                code: otp.join(''),
            }),
        });
        const data = await response.json();
        if (response.status === 200) {
            setLoading(false);
            // const data = await response.json();
            const userId = data.userId;

            setverify(true);
            navigate('/Reg2', { state: { userEmail: userEmail, id: userId } })
        } else {
            setLoading(false);
            console.error('Verification failed:', data.message);
        }
    };

    return (
        <main className="reg-main">
            <div className="reg-form-space">
                <img src="foodbank-images/foodbank-logo.png" alt="" className="reg-logo" />
                <h2 className="registration-subheading">
                    OTP Verification
                </h2>
                <p className="regristration-descriptive-text">
                    Enter the OTP sent to <span>{userEmail}</span>
                </p>
                <form action="" className="registration-form">
                    <div className="otp-inputs">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                type="tel"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                            />
                        ))}
                    </div>
                    <span className='reg-form-sign-space'>
                        <p>Didn’t receive the OTP? </p>
                        <a href="#">Resend</a>
                    </span>
                    {loading && (
                        <div className="preloader-overlay">
                            <div className="preloader"></div>
                        </div>
                    )}
                    <div className='reg-form-btn rfb-otp' onClick={handleSubmit} disabled={loading}>
                        Verify
                    </div>
                </form>
            </div>
            <Phonebg></Phonebg>
            {verify ? <div className="verification-modal-bg" onClick={() => { setverify(false) }}>
                <div className="otp-verification-modal">
                    <img src="foodbank-images/check-img.png" alt="" className="otp-check-pic" />
                    <h2>
                        Verification Successful
                    </h2>
                    <p>
                        Great news! Your verification has been successfully completed.
                    </p>
                    <a href="#" onClick={() => { setverify(false) }}>
                        Continue
                    </a>
                </div>
            </div> : null}
        </main>
    )
}
