/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from './Navbar';
import Sidebar from './sideBar';
import BackIcon from '../src/foodbank-images/back-icon.png';
import CheckIcon from '../src/foodbank-images/check-img.png';

export default function TransactionChain2() {


    const navigate = useNavigate();
    const location = useLocation();

    const overallTotal = location.state && location.state.overallTotal;
    const orderId = location.state && location.state.orderId;
    const numberOfItems = location.state && location.state.numberOfItems;
    const userFullname = location.state && location.state.userFullname;
    const deliveryDetails = location.state && location.state.deliveryDetails;
    const formattedOrderDate = location.state && location.state.formattedOrderDate;
    const totalItemsPrice = location.state && location.state.totalItemsPrice;
    const sampleSummary_ = location.state && location.state.sampleSummary_;

    const handleContinue = () => {
        navigate('/TransactionChain3', { state: { orderId, numberOfItems, userFullname, deliveryDetails, formattedOrderDate, totalItemsPrice, sampleSummary_ } });
    };

    return (
        <div className='dashboard'>
            <NavBar />
            <div className="dashboard-space">
                <Sidebar />
                <div className="major-container">
                    <span className="back-btn">
                        <img src={BackIcon} className='back-btn-image' alt="" />
                    </span>
                    <div className="chain-flow">
                        <span className='greenbg-color'></span>
                        <hr className='green-color' />
                        <span className='greenbg-color'></span>
                        <hr className='green-color' />
                        <span></span>
                    </div>
                    <div className="chain-container">
                        <h2>Checkout</h2>
                        <img src={CheckIcon} alt="" className="otp-check-pic" />
                        <h2>
                            Application successful
                        </h2>
                        <p className='cc-description'>
                            Order recieved await confirmation in your mail
                        </p>
                        <div className="order-payment-summary">
                            <h4 className="ops-subheading">
                                Payment summary
                            </h4>
                            <section className="payment-summary-description">
                                <span>
                                    <p className='psd-detail'>Total items price</p>
                                    <p className='psd-price'>&#8358; {overallTotal}</p>
                                </span>
                                {sampleSummary_.map((item, index) => (
                                    <span key={index}>
                                        <p className='psd-detail'>{item.value}</p>
                                        <p className='psd-price'>&#8358; {item.price}</p>
                                    </span>
                                ))}
                                <hr className='psd-hr' />
                                <span className="psd-total">
                                    <p className='psdt-detail'>Total Price</p>
                                    <p className='psd-price'>&#8358; {overallTotal}</p>
                                </span>
                            </section>
                            <div className='reg-form-btn' onClick={handleContinue}>
                                Done
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
