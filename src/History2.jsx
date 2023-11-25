import React from 'react';
import "../src/foodbank-css/dashboard.css"
import { useState } from 'react';
import NavBar from './Navbar'; 
import Sidebar from './sideBar';

// Import images
import hamburgerIcon from '../src/foodbank-images/foodbank-hamburger-icon.png';
import manImage from '../src/foodbank-images/man-image.png';
import property34Image from '../src/foodbank-images/Property 34.png';
import bag2Image from '../src/foodbank-images/bag-2.png';
import SemoImage from '../src/foodbank-images/semo-image.png';
import Trash from '../src/foodbank-images/trash.png';
import OilImage from '../src/foodbank-images/oil-pic.png';
import BackImage from '../src/foodbank-images/back-icon.png'

export default function History2() {
    const [sideBarShow,setsideBarShow] = useState(false)
  return (
    <>
        <div className='dashboard'>
        <NavBar setsideBarShow={setsideBarShow} />
            <div className="dashboard-space">
            <Sidebar sideBarShow={sideBarShow} setSideBarShow={setsideBarShow} />
                <div className="major-container">
                    <span className="back-btn">
                        <img src={BackImage} className='back-btn-image' alt="" />
                    </span>
                    <main className="home-history-space">
                        <div className="home-table-space">
                            <table>
                                <thead>
                                    <th>Buyer</th>
                                    <th>Order no</th>
                                    <th>Time</th>
                                    <th>No of items</th>
                                    <th>Amount</th>
                                </thead>
                                <tr>
                                    <td>
                                        <span className='table-span'>
                                            <img src={manImage} alt="" className='table-img'/>
                                            <small>
                                                Romelu Lukaku
                                            </small>
                                        </span>
                                    </td>
                                    <td> #0192730</td>
                                    <td>August 14, 2023 at 3pm</td>
                                    <td>5 Items</td>
                                    <td>&#8358; 34,000</td>
                                </tr>
                            </table>
                        </div>
                    </main>
                    <div className="order-items">
                        <section className="order-item">
                            <div className="oi-side1">
                                <figure>
                                    <img src={SemoImage}alt="" />
                                </figure>
                                <div className="oi-side1-details">
                                    <p>Rice</p>
                                    <p>2 bags</p>
                                    <p>&#8358; 70,000</p>
                                </div>
                            </div>
                            <div className="oi-side2">
                                <img src={Trash} alt="" />
                            </div>
                        </section>
                        <section className="order-item">
                            <div className="oi-side1">
                                <figure>
                                    <img src={OilImage} alt="" />
                                </figure>
                                <div className="oi-side1-details">
                                    <p>Groundnut Oil</p>
                                    <p>2 kegs</p>
                                    <p>&#8358; 10,00</p>
                                </div>
                            </div>
                            <div className="oi-side2">
                                <img src={Trash} alt="" />
                            </div>
                        </section>
                        <section className="order-item">
                            <div className="oi-side1">
                                <figure>
                                    <img src="foodbank-images/spaghetti-image.png" alt="" />
                                </figure>
                                <div className="oi-side1-details">
                                    <p>Spaghetti</p>
                                    <p>4 Cartons</p>
                                    <p>&#8358; 45,000</p>
                                </div>
                            </div>
                            <div className="oi-side2">
                                <img src={Trash}  alt="" />
                            </div>
                        </section>
                        <section className="order-item">
                            <div className="oi-side1">
                                <figure>
                                    <img src="foodbank-images/indomie-image.png" alt="" />
                                </figure>
                                <div className="oi-side1-details">
                                    <p>Indomie</p>
                                    <p>10 Cartons</p>
                                    <p>&#8358; 60,000</p>
                                </div>
                            </div>
                            <div className="oi-side2">
                                <img src={Trash}  alt="" />
                            </div>
                        </section>
                    </div>
                    <div className="order-payment-summary">
                        <h2 className="ops-subheading">
                            Payment summary
                        </h2>
                        <section className="payment-summary-description">
                            <span>
                                <p className='psd-detail'>Service fee</p>
                                <p className='psd-price'>&#8358; 30,000</p>
                            </span>
                            <span>
                                <p className='psd-detail'>VAT</p>
                                <p className='psd-price'>&#8358; 30,000</p>
                            </span>
                            <span>
                                <p className='psd-detail'>Interest</p>
                                <p className='psd-price'>&#8358; 30,000</p>
                            </span>
                            <span>
                                <p className='psd-detail'>Delivery fee</p>
                                <p className='psd-price'>&#8358; 30,000</p>
                            </span>
                            <hr className='psd-hr' />
                            <span className="psd-total">
                                <p className='psd-detail'>Total Price</p>
                                <p className='psd-price'>&#8358; 30,000</p>
                            </span>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
