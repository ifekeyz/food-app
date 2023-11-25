import React from 'react';
import "../src/foodbank-css/dashboard.css"
import { useState } from 'react';
import NavBar from './Navbar';
import Sidebar from './sideBar';
import hamburgerIcon from '../src/foodbank-images/foodbank-hamburger-icon.png';
import manImage from '../src/foodbank-images/man-image.png';
import property34Image from '../src/foodbank-images/Property 34.png';
import bag2Image from '../src/foodbank-images/bag-2.png';
import homeActiveImage from '../src/foodbank-images/home-active.png';
import storeInactiveImage from '../src/foodbank-images/store-inactive.png';
import historyInactiveImage from '../src/foodbank-images/history-inactive.png';
import profileInactiveImage from '../src/foodbank-images/profile-inactive.png';
import backIconImage from '../src/foodbank-images/back-icon.png';
import foodbankLogoImage from '../src/foodbank-images/foodbank-logo2.png';
import cartMockupImage from '../src/foodbank-images/cart-mockup.png'

export default function History3() {
    const [sideBarShow,setsideBarShow] = useState(false)
  return (
    <>
        <div className='dashboard'>
        <NavBar setsideBarShow={setsideBarShow} />
            <div className="dashboard-space">
            <Sidebar sideBarShow={sideBarShow} setSideBarShow={setsideBarShow} />
                <div className="major-container">
                    <span className="back-btn">
                        <img src={backIconImage} className='back-btn-image' alt="" />
                    </span>
                    <div className="mc-history-space">
                        <section className="empty-history-space">
                            <img src={cartMockupImage} alt="" />
                            <h3>
                                No history yet
                            </h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur. Tellus est sit venenatis scelerisque vulputate ut purus in purus.
                            </p>
                            <a href="#">Shop Now</a>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
