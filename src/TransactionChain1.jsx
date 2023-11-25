/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from './Navbar';
import Sidebar from './sideBar';
import backIconImage from '../src/foodbank-images/back-icon.png';
import axios from 'axios';
import { useUser } from './UserContext';

export default function TransactionChain1() {
    const [sideBarShow, setSideBarShow] = useState(false);
    const { userInfo} = useUser();
    const navigate = useNavigate();
    const location = useLocation();

    const userId = location.state && location.state.userId;
    const totalItemsPrice = location.state && location.state.totalItemsPrice;
    const overallTotal = location.state && location.state.overallTotal;
    const fullName = userInfo.fullName;
    const sampleSummary_ = location.state && location.state.sampleSummary_;

    const [stateInput, setStateInput] = useState('');
    const [cityInput, setCityInput] = useState('');
    const [locationInput, setLocationInput] = useState('');
    const [phoneNumberInput, setPhoneNumberInput] = useState('');

    const handleCreateOrder = async (e) => {
        e.preventDefault();

        try {
            const deliveryDetails = {
                state: stateInput,
                city: cityInput,
                location: locationInput,
                phoneNumber: phoneNumberInput,
            };

            const response = await axios.post('https://api.sovereigntechltd.com/api/v1/order/createOrder', {
                userId: userId,
                deliveryDetails: deliveryDetails,
                allItemsTotalPrice: overallTotal,
                userFullname: fullName,
            });

            if (response.status === 200) {
                const orderData = response.data; // This should contain the order data including _id
                const orderId = orderData._id;
                const userFullname = orderData.userFullname;
                const numberOfItems = orderData.orderItems.length;

                // Format the orderDate to "Month dd, yyyy : HH:mm"
                const orderDate = new Date(orderData.orderDate);
                const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                const formattedOrderDate = `${months[orderDate.getMonth()]} ${orderDate.getDate()}-${orderDate.getFullYear()} : ${String(orderDate.getHours()).padStart(2, '0')}:${String(orderDate.getMinutes()).padStart(2, '0')}`;

                // Order created successfully, you can navigate to the checkout screen or handle it as needed
                navigate('/TransactionChain2',{state: { userId, overallTotal, orderId, numberOfItems, userFullname, deliveryDetails, formattedOrderDate,totalItemsPrice,sampleSummary_} });
            } else {
                // Handle the case where order creation failed
                alert(`${response.data.message}`);
            }
        } catch (error) {
            console.error('Error creating order:', error);
        }
    };

    const handleContinue = () => {
        navigate('/TransactionChain2');
    };




    return (
        <div className='dashboard'>
            <NavBar />
            <div className="dashboard-space">
                <Sidebar />
                <div className="major-container">
                    <span className="back-btn">
                        <img src={backIconImage} className='back-btn-image' alt="" />
                    </span>
                    <div className="chain-flow">
                        <span className='greenbg-color'></span>
                        <hr className='greenbg-color' />
                        <span></span>
                        <hr />
                        <span></span>
                    </div>
                    <div className="chain-container">
                        <h2 className="registration-subheading">Add Delivery details</h2>
                        <p className="regristration-descriptive-text">Lorem ipsum dolor sit amet consectetur. Ipsum lobortis tortor enim arcu aliquam.</p>
                        <form className="registration-form">
                            <section className="reg-setup-section">
                                <label htmlFor="">State</label>
                                <input type="text" placeholder="Enter your state" onChange={(e) => setStateInput(e.target.value)} />
                            </section>
                            <section className="reg-setup-section">
                                <label htmlFor="">City</label>
                                <input type="text" placeholder="Enter your city name" onChange={(e) => setCityInput(e.target.value)} />
                            </section>
                            <section className="reg-setup-section">
                                <label htmlFor="">Location</label>
                                <input type="text" placeholder="Enter your Address" onChange={(e) => setLocationInput(e.target.value)} />
                            </section>
                            <section className="reg-setup-section">
                                <label htmlFor="">Phone number</label>
                                <input type="text" placeholder="+234" onChange={(e) => setPhoneNumberInput(e.target.value)} />
                            </section>
                            <button type="submit" className="reg-form-btn" onClick={handleCreateOrder}>
                                Continue
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
