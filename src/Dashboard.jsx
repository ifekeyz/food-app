/* eslint-disable no-unused-vars */
import React from 'react'
import "../src/foodbank-css/dashboard.css"
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './sideBar';
import NavBar from './Navbar';
import modalCircle from '../src/foodbank-images/info-circle.png';
import axios from 'axios';
import { useUser } from './UserContext';

export default function Dashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const isApproved= sessionStorage.getItem('isApproved');
    // const userToken = location.state && location.state.token;
    const userId = sessionStorage.getItem('userId');
    const userToken = sessionStorage.getItem('userToken');

    const { userInfo } = useUser();

    const [regModal, setregModal] = useState(false);
    const [confirmModal, setconfirmModal] = useState(true)
    const [paymentModal, setpaymentModal] = useState(false);
    const goBack = {

    }



    const handleMakePayment = () => {
        setregModal(false);
        setpaymentModal(true);
    };

    const [shoppingHistory, setShoppingHistory] = useState([]);
    const [sideBarShow, setSideBarShow] = useState(false);

    useEffect(() => {
        const fetchShoppingHistory = async () => {
            try {
                const response = await axios.get(`https://api.sovereigntechltd.com/api/v1/order/getShoppingHistory/${userId}`);
                setShoppingHistory(response.data);
            } catch (error) {
                console.error('Error fetching shopping history:', error);
                // Handle the error as needed
            }
        };

        fetchShoppingHistory();
    }, [userId]);

    const [walletData, setWalletData] = useState([]);
    const [walletTotalData, setWalletTotalData] = useState([]);
    const [walletCurrentLoanData, setWalletCurrentLoanData] = useState([]);
    const [monthlyPayback, setMonthlyPayback] = useState([]);
    const [amountLeft, setAmountLeft] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.sovereigntechltd.com/api/v1/wallet/getWallet/${userId}`);
                const { totalLoan, paidLoan, currentLoan } = response.data;

                const walletData = parseFloat(paidLoan).toFixed(2);
                const walletTotalData = parseFloat(totalLoan).toFixed(2);
                const walletCurrentLoanData = parseFloat(currentLoan).toFixed(2);
                const monthlyPayback = parseFloat(((totalLoan - paidLoan) / 3).toFixed(2));
                const amountLeft = parseFloat((totalLoan - paidLoan).toFixed(2));

                setWalletData(walletData);
                setWalletTotalData(walletTotalData);
                setWalletCurrentLoanData(walletCurrentLoanData);
                setMonthlyPayback(monthlyPayback);
                setAmountLeft(amountLeft)
            } catch (error) {
                // alert('Error fetching wallet data:', error);
            }
        };

        fetchData();
    }, [userId]);

    return (
        <div className='dashboard'>
            <NavBar setSideBarShow={setSideBarShow} />
            <div className="dashboard-space">
                <Sidebar sideBarShow={sideBarShow} setSideBarShow={setSideBarShow} />
                <div className="major-container">
                    <header className='home-header'>
                        <div className='home-loan-application hl-div'>
                            <p>
                                Monthly Payback
                            </p>
                            <h1>
                                &#8358; {monthlyPayback}
                            </h1>
                            <span onClick={() => { setregModal(true) }}>
                                Apply for food loan
                            </span>
                        </div>
                        <div className='home-loan-statement hl-div'>
                            <section className="hls-balance1">
                                <div className="current-loan">
                                    <p>Current loan</p>
                                    <h2>-&#8358; {walletCurrentLoanData}</h2>
                                </div>
                                <div className="paid-loan">
                                    <p>Paid loan</p>
                                    <h2>&#8358; {walletData}</h2>
                                </div>
                            </section>
                            <section className="hls-balance2">
                                <div className="Amount-left">
                                    <p>Amount left</p>
                                    <h2>&#8358; {amountLeft}</h2>
                                </div>
                                <div className="Total-loan">
                                    <p>Total loan</p>
                                    <h2>&#8358; {walletTotalData}</h2>
                                </div>
                            </section>
                        </div>
                    </header>
                    <main className="home-history-space">
                        <h2 className="history-subheading">
                            Order history
                        </h2>
                        <div className="home-table-space">
                            <table>
                                <thead>
                                    <th>S/n</th>
                                    <th>Order no</th>
                                    <th>Time</th>
                                    <th>No of items</th>
                                    <th>Amount</th>
                                </thead>
                                {shoppingHistory.map((historyItem, index) => (
                                    <tr key={historyItem.orderNumber}>
                                        <td>{index + 1}</td>
                                        {/* <td>
                                                    <span className='table-span'>
                                                        <img src={manImageTable} alt='' className='table-img' />
                                                        <small>{historyItem.userFullname}</small>
                                                    </span>
                                                </td> */}
                                        <td>{historyItem.orderNumber}</td>
                                        <td>{new Date(historyItem.orderDate).toDateString()}</td>
                                        <td>{historyItem.orderItems.length} Items</td>
                                        <td>&#8358; {historyItem.allItemsTotalPrice}</td>
                                    </tr>
                                ))}
                            </table>
                        </div>
                    </main>
                </div>
            </div>
            {regModal ? <div className="registraion-modal-overlay">
                <div className="registration-modal">
                    <figure className="reg-modal-cancelbtn">
                        <img src="foodbank-images/x-circle.png" onClick={() => { setregModal(false) }} alt="" />
                    </figure>
                    <h2>
                        Registrayion Fee
                    </h2>
                    <p>
                        Experience limitless opportunities with a single, one-time registration fee.
                    </p>
                    <div className="payment-gateway-logos">
                        <span>
                            <img src="foodbank-images/mastercard-icon.png" alt="" />
                        </span>
                        <span>
                            <img src="foodbank-images/paypal-icon.png" alt="" />
                        </span>
                        <span>
                            <img src="foodbank-images/visa-icon.png" alt="" />
                        </span>
                    </div>
                    <form action="" className="registration-form">
                        <section className='reg-setup-section'>
                            <label htmlFor="">
                                Type of Card
                            </label>
                            <select name="" id="">
                                <option value="" disabled selected>Credit Card</option>
                                <option value="">Master card</option>
                                <option value="">Visa card</option>
                                <option value="">Paypal</option>
                            </select>
                        </section>
                        <section className='reg-setup-section'>
                            <label htmlFor="">Name on card</label>
                            <input type="text" placeholder='Romelu lukaku' />
                        </section>
                        <section className='reg-setup-section'>
                            <label htmlFor="">Card number</label>
                            <input type="tel" placeholder='****  ****  ****  ****' />
                        </section>
                        <div className="card-details">
                            <section className='reg-setup-section'>
                                <label htmlFor="">Expiration date</label>
                                <input type="tel" placeholder='MM/YY' />
                            </section>
                            <section className='reg-setup-section'>
                                <label htmlFor="">Security code</label>
                                <input type="tel" placeholder='CVC' />
                            </section>
                        </div>
                        <div className='reg-form-btn' onClick={handleMakePayment} >
                            Make payment
                        </div>
                    </form>
                </div>
            </div> : null}
            {paymentModal ? <div className="verification-modal-bg" >
                <div className="otp-verification-modal">
                    <img src="foodbank-images/check-img.png" alt="" className="otp-check-pic" />
                    <h2>
                        Payment successful
                    </h2>
                    <p>
                        Great news! Your registration fee has been successfully paid.
                    </p>
                    <a href="#" onClick={() => { setpaymentModal(false) }}>
                        Continue
                    </a>
                </div>
            </div> : null}
            {confirmModal  && !isApproved ?  <div className="verification-modal-bg" onClick={() => { setconfirmModal(true) }} >
                <div className="otp-verification-modal">
                    <img src={modalCircle} alt="" className="otp-check-pic" />
                    <h2>
                        Identity Confirmation
                    </h2>
                    <p className='confirm-text'>
                        Kindly wait as we verify your identity with your workplace. You'll receive an email once your eligibility is confirmed.
                    </p>
                    <Link to={'/login'}>
                        Continue
                    </Link>
                </div>
            </div> : null}
        </div>
    )
}
