import React from 'react';
import { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import hamburgerIcon from '../src/foodbank-images/foodbank-hamburger-icon.png';
import manImage from '../src/foodbank-images/man-image.png';
import property34 from '../src/foodbank-images/Property 34.png';
import bag2 from '../src/foodbank-images/bag-2.png';
import foodbankLogo2 from '../src/foodbank-images/foodbank-logo2.png';
import homeInactive from '../src/foodbank-images/home-inactive.png';
import storeInactive from '../src/foodbank-images/store-inactive.png';
import historyInactive from '../src/foodbank-images/history-inactive.png';
import profileActive from '../src/foodbank-images/profile-active.png';
import backIcon from '../src/foodbank-images/back-icon.png';
import frame from '../src/foodbank-images/frame.png';
import forwardIcon from '../src/foodbank-images/arrow-right.png';
import edit2 from '../src/foodbank-images/edit-2.png';
import notificationIcon from '../src/foodbank-images/notification.png';
import securityUser from '../src/foodbank-images/security-user.png';
import messageQuestion from '../src/foodbank-images/message-question.png';
import headphones from '../src/foodbank-images/headphones.png';
import userPic from '../src/foodbank-images/user-pic.png';
import xCircle from '../src/foodbank-images/x-circle.png';
import checkImg from '../src/foodbank-images/check-img.png';
import NavBar from './Navbar';
import Sidebar from './sideBar';
import axios from 'axios';
import { useUser } from './UserContext';


export default function Profile() {
    const { userInfo } = useUser();
    const userId = sessionStorage.getItem('userId');
    const userToken = sessionStorage.getItem('userToken');

    const [ChangeName, setChangeName] = useState(false);
    const [InfoChange, setInfoChange] = useState(false)
    const changeInfo = () => {
        setChangeName(false);
        setInfoChange(true)
    }
    const [sentMessage, setsentMessage] = useState(false);

    //profile function 
    const [personalInfo, setpersonalInfo] = useState(true)
    const [notification, setnotification] = useState(false)
    const [TermsPrivacy, setTermsPrivacy] = useState(false)
    const [faqs, setfaqs] = useState(false)
    const [contactSupport, setcontactSupport] = useState(false)

    const handlePersonalInfo = () => {
        setpersonalInfo(true)
        setnotification(false)
        setTermsPrivacy(false)
        setfaqs(false)
        setcontactSupport(false)
    }
    const handleNotification = () => {
        setpersonalInfo(false)
        setnotification(true)
        setTermsPrivacy(false)
        setfaqs(false)
        setcontactSupport(false)
    }
    const handleTermsPrivacy = () => {
        setpersonalInfo(false)
        setnotification(false)
        setTermsPrivacy(true)
        setfaqs(false)
        setcontactSupport(false)
    }
    const handleFaq = () => {
        setpersonalInfo(false)
        setnotification(false)
        setTermsPrivacy(false)
        setfaqs(true)
        setcontactSupport(false)
    }
    const handleContactSupport = () => {
        setpersonalInfo(false)
        setnotification(false)
        setTermsPrivacy(false)
        setfaqs(false)
        setcontactSupport(true)
    }

    const [pdShow, setpdShow] = useState(false)
    const [userData, setUserData] = useState([]);

    useEffect(() => {

        axios.get(`https://api.sovereigntechltd.com/api/v1/users/${userId}`)
            .then((response) => {
                // Set the user data from the API response
                setUserData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, []);


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [complaints, setComplaints] = useState('');
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            complaint: complaints,
        };

        try {
            const response = await axios.post('https://api.sovereigntechltd.com/api/v1/admin/createComplaint', formData);

            // Check if the request was successful
            if (response.status === 200) {
                setsentMessage(true);
            } else {
                // Handle other response statuses if needed
                console.error('Error submitting form:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('Error submitting form: ' + error.message);
        }
    };

    const [faqData, setFaqData] = useState([]);

    useEffect(() => {
        // Fetch FAQs from the API
        axios
            .get('https://api.sovereigntechltd.com/api/v1/admin/getFaqs')
            .then((response) => {
                console.log('API Response:', response.data);
                const faqItems = response.data.faqs;
                setFaqData(faqItems);
            })
            .catch((error) => {
                console.error('Error fetching FAQs:', error);
            });
    }, []);

    return (
        <div className='dashboard'>
            <NavBar />
            <div className="dashboard-space">
                <Sidebar />
                <div className="major-container">
                    <span className="back-btn">
                        <img src={backIcon} className='back-btn-image' alt="" onClick={() => { setpdShow(false) }} />
                    </span>
                    <main className="personal-info-space">
                        <section className={`profile-description ${pdShow ? "showPd" : ""}`} onClick={() => setpdShow(!pdShow)}>
                            <figure className="profile-picture">
                                <img src={userInfo.userImage} alt="" />
                            </figure>
                            <div className="profile-nav-bar">
                                <section className='pnb-item' onClick={handlePersonalInfo}>
                                    <span>
                                        <img src={frame} alt="" />
                                        <p>Personal information</p>
                                    </span>
                                    <img src={forwardIcon} alt="" />
                                </section>
                                <section className='pnb-item' onClick={handleTermsPrivacy}>
                                    <span>
                                        <img src={securityUser} alt="" />
                                        <p>Terms and privacy</p>
                                    </span>
                                    <img src={forwardIcon} alt="" />
                                </section>
                                <section className='pnb-item' onClick={handleFaq}>
                                    <span>
                                        <img src={messageQuestion} alt="" />
                                        <p>FAQS</p>
                                    </span>
                                    <img src={forwardIcon} alt="" />
                                </section>
                                <section className='pnb-item' onClick={handleContactSupport}>
                                    <span>
                                        <img src={headphones} alt="" />
                                        <p>Contact support</p>
                                    </span>
                                    <img src={forwardIcon} alt="" />
                                </section>
                            </div>
                        </section>
                        {personalInfo ? <section className='personal-info-tab profile-second-tab'>
                            <div className='pi-item'>
                                <span>
                                    <p>Full name</p>
                                    <p>{userData.fullname}</p>
                                </span>
                                <img src={edit2} onClick={() => { setChangeName(true) }} alt="" />
                            </div>
                            <div className='pi-item'>
                                <span>
                                    <p>Email</p>
                                    <p>{userData.email}</p>
                                </span>
                                <img src={edit2} alt="" />
                            </div>
                            <div className='pi-item'>
                                <span>
                                    <p>Phone number</p>
                                    <p>{userData.phonenumber}</p>
                                </span>
                                <img src={edit2} alt="" />
                            </div>
                            <div className='pi-item'>
                                <span>
                                    <p>Home address</p>
                                    <p>{userData.address}</p>
                                </span>
                                <img src={edit2} alt="" />
                            </div>
                            <div className='pi-item'>
                                <span>
                                    <p>Company</p>
                                    <p>{userData.company}</p>
                                </span>
                                <img src={edit2} alt="" />
                            </div>
                            <div className='pi-item'>
                                <span>
                                    <p>Salary</p>
                                    <p>&#8358;{userData.salary}</p>
                                </span>
                                <img src={edit2} alt="" />
                            </div>
                            <div className='pi-item'>
                                <span>
                                    <p>Job title</p>
                                    <p>{userData.jobtitle}</p>
                                </span>
                                <img src={edit2} alt="" />
                            </div>

                        </section> : null}
                        {notification ? <section className="notification-tab profile-second-tab">
                            <p className="notification-subheading">
                                Today
                            </p>
                            <div className="notification-box">
                                <img src={userPic} alt="" />
                                <span>
                                    <p>Your Order is on its way.</p>
                                    <time>Just now</time>
                                </span>
                            </div>
                            <div className="notification-box">
                                <img src={userPic} alt="" />
                                <span>
                                    <p>Your Order is on its way.</p>
                                    <time>Just now</time>
                                </span>
                            </div>
                            <div className="notification-box">
                                <img src={userPic} alt="" />
                                <span>
                                    <p>Your registration fee has been recieved!</p>
                                    <time>Just now</time>
                                </span>
                            </div>
                            <div className="notification-box">
                                <img src={userPic} alt="" />
                                <span>
                                    <p>Your Order is on its way.</p>
                                    <time>Just now</time>
                                </span>
                            </div>
                            <div className="notification-box">
                                <img src={userPic} alt="" />
                                <span>
                                    <p>Your Order is on its way.</p>
                                    <time>Just now</time>
                                </span>
                            </div>

                            <p className="notification-subheading">
                                23rd of October, 2023
                            </p>

                            <div className="notification-box">
                                <img src={userPic} alt="" />
                                <span>
                                    <p>Your Order is on its way.</p>
                                    <time>Just now</time>
                                </span>
                            </div>
                            <div className="notification-box">
                                <img src={userPic} alt="" />
                                <span>
                                    <p>Your Order is on its way.</p>
                                    <time>Just now</time>
                                </span>
                            </div>
                            <div className="notification-box">
                                <img src={userPic} alt="" />
                                <span>
                                    <p>Your registration fee has been recieved!</p>
                                    <time>Just now</time>
                                </span>
                            </div>
                            <div className="notification-box">
                                <img src={userPic} alt="" />
                                <span>
                                    <p>Your Order is on its way.</p>
                                    <time>Just now</time>
                                </span>
                            </div>
                            <div className="notification-box">
                                <img src={userPic} alt="" />
                                <span>
                                    <p>Your Order is on its way.</p>
                                    <time>Just now</time>
                                </span>
                            </div>
                        </section> : null}
                        {TermsPrivacy ? <section className="terms-privacy profile-second-tab">
                            <h5 className="tp-subheading">
                                Terms
                            </h5>
                            <p className="terms">
                                Lorem ipsum dolor sit amet consectetur. Ac elementum at aliquet eget vestibulum id porta. Donec metus eget molestie habitasse ultrices. Sagittis arcu morbi sem ornare nibh ac fusce. Lectus egestas tortor nec massa scelerisque lorem sed. Morbi ligula hac dui duis. In faucibus nec eget tincidunt massa vitae pulvinar dictumst. Curabitur tellus fermentum lacus est. Tellus ultricies consectetur semper quisque dictumst pharetra consectetur at praesent. Sagittis eget orci lorem pharetra placerat viverra nisl sagittis. Aenean amet risus in aliquam nulla phasellus eros. Porttitor tellus at volutpat netus.
                            </p>
                            <h5 className="tp-subheading">
                                Privacy
                            </h5>
                            <p className="privacy">
                                Lorem ipsum dolor sit amet consectetur. Ac elementum at aliquet eget vestibulum id porta. Donec metus eget molestie habitasse ultrices. Sagittis arcu morbi sem ornare nibh ac fusce. Lectus egestas tortor nec massa scelerisque lorem sed. Morbi ligula hac dui duis. In faucibus nec eget tincidunt massa vitae pulvinar dictumst. Curabitur tellus fermentum lacus est. Tellus ultricies consectetur semper quisque dictumst pharetra consectetur at praesent. Sagittis eget orci lorem pharetra placerat viverra nisl sagittis. Aenean amet risus in aliquam nulla phasellus eros. Porttitor tellus at volutpat netus.
                            </p>
                        </section> : null}
                        {faqs ? <section className="faqs profile-second-tab">
                            <Accordion defaultActiveKey='0'>
                                {faqData.map((faqItem, index) => (
                                    <Accordion.Item key={index} eventKey={index.toString()}>
                                        <Accordion.Header>{faqItem.title}</Accordion.Header>
                                        <Accordion.Body>{faqItem.content}</Accordion.Body>
                                    </Accordion.Item>
                                ))}
                            </Accordion>
                        </section> : null}
                        {contactSupport ? <section className="contact-us profile-second-tab">
                            <h2>
                                Fill the form to <span>Contact Us</span>
                            </h2>
                            <form className="registration-form" onSubmit={handleSubmit}>
                                <section className="reg-setup-section">
                                    <label htmlFor="firstName">First name</label>
                                    <input type="text" id="firstName" name="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Enter your first name" />
                                </section>
                                <section className="reg-setup-section">
                                    <label htmlFor="lastName">Last name</label>
                                    <input type="text" id="lastName" name="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Enter your last name" />
                                </section>
                                <section className="reg-setup-section">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your correct email address" />
                                </section>
                                <section className="reg-setup-section">
                                    <label htmlFor="complaints">Your complaint</label>
                                    <textarea id="complaints" name="complaints" value={complaints} onChange={(e) => setComplaints(e.target.value)} cols="30" rows="10" placeholder="How can we help you?"></textarea>
                                </section>
                                <button type="submit" className="reg-form-btn">
                                    Send Message
                                </button>
                            </form>
                        </section> : null}
                    </main>
                </div>
            </div>
            {ChangeName ? <div className="verification-modal-bg" >
                <div className="otp-verification-modal">
                    <figure className="reg-modal-cancelbtn">
                        <img src={xCircle} onClick={() => { setChangeName(false) }} alt="" />
                    </figure>
                    <form action="#" className="registration-form ">
                        <section className='reg-setup-section'>
                            <label htmlFor="">
                                Full name
                            </label>
                            <input type="text" htmlValue='Romel Lukaku' />
                        </section>
                        <button type='submit' className='reg-form-btn' onClick={changeInfo}>
                            Save changes
                        </button>
                    </form>
                </div>
            </div> : null}
            {InfoChange ? <div className="verification-modal-bg" >
                <div className="otp-verification-modal">
                    <img src={checkImg} alt="" className="otp-check-pic" />
                    <h2>
                        Information changed
                    </h2>
                    <p>
                        Your order exceeds the cash limit. Please consider adjusting the items in your cart.
                    </p>
                    <a href="#" onClick={() => { setInfoChange(false) }}>
                        Back
                    </a>
                </div>
            </div> : null}
            {sentMessage ? <div className="verification-modal-bg" >
                <div className="otp-verification-modal">
                    <img src={checkImg} alt="" className="otp-check-pic" />
                    <h2>
                        Message Sent
                    </h2>
                    <p>
                        Your order exceeds the cash limit. Please consider adjusting the items in your cart.
                    </p>
                    <a href="/Profile" onClick={() => { setsentMessage(false) }}>
                        Back to Home
                    </a>
                </div>
            </div> : null}
        </div>
    )
}