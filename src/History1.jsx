import React from 'react';
import "../src/foodbank-css/dashboard.css"
import { useState } from 'react';
import Sidebar from './sideBar';
import NavBar from './Navbar';
import manImage from '../src/foodbank-images/man-image.png';
import property34Image from '../src/foodbank-images/Property 34.png';
import bag2Image from '../src/foodbank-images/bag-2.png';
import hamburgerIcon from '../src/foodbank-images/foodbank-hamburger-icon.png';
import manImageTable from '../src/foodbank-images/man-image.png';
import backIcon from '../src/foodbank-images/back-icon.png';


export default function History1() {
    const [sideBarShow,setSideBarShow] = useState(false)
  return (
    <>
        <div className='dashboard'>
        <NavBar setSideBarShow={setSideBarShow} />
            <div className="dashboard-space">
            <Sidebar sideBarShow={sideBarShow} setSideBarShow={setSideBarShow} />
                <div className="major-container">
                    <span className="back-btn">
                        <img src={backIcon} className='back-btn-image' alt="" />
                    </span>
                    <main className="home-history-space">
                    <h2 className="history-subheading">
                        Recent Orders
                    </h2>
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
                                        <img src={manImageTable} alt="" className='table-img'/>
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
                            <tr>
                                <td>
                                    <span className='table-span'>
                                        <img src={manImageTable} alt="" className='table-img'/>
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
                            <tr>
                                <td>
                                    <span className='table-span'>
                                        <img src={manImageTable} alt="" className='table-img'/>
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
                            <tr>
                                <td>
                                    <span className='table-span'>
                                        <img src={manImageTable} alt="" className='table-img'/>
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
                            <tr>
                                <td>
                                    <span className='table-span'>
                                        <img src={manImageTable} alt="" className='table-img'/>
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
                            <tr>
                                <td>
                                    <span className='table-span'>
                                        <img src={manImageTable} alt="" className='table-img'/>
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
                            <tr>
                                <td>
                                    <span className='table-span'>
                                        <img src={manImageTable} alt="" className='table-img'/>
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
                            <tr>
                                <td>
                                    <span className='table-span'>
                                        <img src={manImageTable} alt="" className='table-img'/>
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
                </div>
            </div>
        </div>
    </>
  )
}
