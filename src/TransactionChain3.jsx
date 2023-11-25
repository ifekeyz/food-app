/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import manImage from './foodbank-images/man-image.png';
import backIcon from './foodbank-images/back-icon.png';
import NavBar from './Navbar';
import Sidebar from './sideBar';
import { Link } from 'react-router-dom';
import axios from 'axios';


export default function TransactionChain3() {
    const navigate = useNavigate();
    const location = useLocation();

    const totalItemsPrice = location.state && location.state.totalItemsPrice;
    const orderId = location.state && location.state.orderId;
    const numberOfItems = location.state && location.state.numberOfItems;
    const userFullname = location.state && location.state.userFullname;
    const deliveryDetails = location.state && location.state.deliveryDetails;
    const formattedOrderDate = location.state && location.state.formattedOrderDate;
    const sampleSummary_ = location.state && location.state.sampleSummary_;

    const [orderDetails, setOrderDetails] = useState('');

    useEffect(() => {
        // Make a GET request to fetch order details
        const fetchOrderDetails = async () => {
            try {
                const response = await axios.get(`https://api.sovereigntechltd.com/api/v1/order/singleOrder/${orderId}`);

                if (response.status === 200) {
                    // Set the order details in state
                    setOrderDetails(response.data);
                } else {
                    console.log('Failed to fetch order details');
                }
            } catch (error) {
                console.error('Error fetching order details:', error);
            }
        };

        fetchOrderDetails(); // Call the function when the component mounts
    }, [orderId]);



    return (
        <div className='dashboard'>
            <NavBar />
            <div className="dashboard-space">
                <Sidebar />
                <div className="major-container">
                    <span className="back-btn">
                        <img src={backIcon} className='back-btn-image' alt="" />
                    </span>
                    <div className="chain-flow">
                        <span className='greenbg-color'></span>
                        <hr className='green-color' />
                        <span className='greenbg-color'></span>
                        <hr className='green-color' />
                        <span className='greenbg-color'></span>
                    </div>
                    <div className="chain-container">
                        <section className="cc-order-description">
                            <div>
                                <p>Order No - <span>{orderDetails.orderNumber}</span></p>
                                <time>{formattedOrderDate}</time>
                            </div>
                            <div>{orderDetails.status}</div>
                        </section>
                        <section className="item-sale-desc">
                            <p>{numberOfItems}Items Purchased</p>
                            <span>Show items</span>
                        </section>
                        <hr className="cc-order-line" />
                        <div className="cc-buyer-info">
                            <section className="cc-role">
                                <img src={manImage} alt="" />
                                <div>
                                    <p className='csr-role'>{userFullname}</p>
                                    {/* <p className='csr-client'>Buyer</p> */}
                                </div>
                            </section>
                            <p className="order-price">
                                &#8358; {totalItemsPrice}
                            </p>
                        </div>
                        <div className="cc-delivery-detail">
                            <div className="cc-dd-subheading">
                                <p>
                                    Delivery address
                                </p>
                                <Link href="#">Edit</Link>
                            </div>
                            <section >
                                <span>
                                    <p className='dda-detail'>State</p>
                                    <p className='dda-data'>{deliveryDetails.state}</p>
                                </span>
                                <span>
                                    <p className='dda-detail'>City</p>
                                    <p className='dda-data'> {deliveryDetails.city}</p>
                                </span>
                                <span>
                                    <p className='dda-detail'>Location</p>
                                    <p className='dda-data'>{deliveryDetails.location}</p>
                                </span>
                                <span>
                                    <p className='dda-detail'>Phone number</p>
                                    <p className='dda-data'>{deliveryDetails.phoneNumber}</p>
                                </span>
                            </section>
                        </div>
                        <div className="cc-payment-detail">
                            <div className="cc-dd-subheading">
                                <p>
                                    Payment Summary
                                </p>
                            </div>
                            <section >
                                {sampleSummary_.map((item, index) => (
                                    <span key={index}>
                                        <p className='psd-detail'>{item.value}</p>
                                        <p className='psd-price'>&#8358; {item.price}</p>
                                    </span>
                                ))}
                                <hr className="ccp-line" />
                                <div className="payment-total-prc">
                                    <p>Total Price</p>
                                    <p>&#8358; {orderDetails.allItemsTotalPrice}</p>
                                </div>
                            </section>
                            <Link to='/Dashboard' className='reg-form-btn'>
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
