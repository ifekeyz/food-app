import React, { useState, useEffect } from 'react';
import axios from 'axios';
import manImageTable from '../src/foodbank-images/man-image.png';
import backIcon from '../src/foodbank-images/back-icon.png';
import { useUser } from './UserContext';
import NavBar from './Navbar';
import Sidebar from './sideBar';

export default function History1() {
    const [sideBarShow, setSideBarShow] = useState(false);
    const [shoppingHistory, setShoppingHistory] = useState([]);
    const { userInfo } = useUser();
    const userId = sessionStorage.getItem('userId');
    const userToken = sessionStorage.getItem('userToken');

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
                                        <tr>
                                            <th>S/n</th>
                                            <th>Order no</th>
                                            <th>Time</th>
                                            <th>No of items</th>
                                            <th>Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
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
                                    </tbody>
                                </table>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
        </>
    );
}
