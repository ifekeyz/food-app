// NavBar.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import manImage from '../src/foodbank-images/man-image.png';
import property34Image from '../src/foodbank-images/Property 34.png';
import bag2Image from '../src/foodbank-images/bag-2.png';
import hamburgerIcon from '../src/foodbank-images/foodbank-hamburger-icon.png';
import { useUser } from './UserContext';

export default function NavBar({ setSideBarShow, removeTabOne }) {
    const { userInfo } = useUser();
    const history = useNavigate();

    const userId = sessionStorage.getItem('userId');
    const userToken = sessionStorage.getItem('userToken');



    useEffect(() => {
        const isAuthenticated = Boolean(userId && userToken);

        if (!isAuthenticated) {
            history('/login');
        }
    });

    const goCart = () => {
        history('/store');
    }


    return (
        <nav className='dashboard-nav'>

            <img
                src={hamburgerIcon}
                alt=""
                className="nav-side-menu"
                onClick={() => setSideBarShow((prev) => !prev)}
            />
            <div className="nav-side1">
                <p className='nav-indication-text'>
                    Welcome
                </p>
                <p className='nav-indication-text2'>
                    {userInfo.fullName}

                </p>
            </div>
            <div className="nav-side2">
                <figure className='nav-profile-pic'>
                    <img src={userInfo.userImage} alt="" />
                </figure>
                <figure onClick={goCart} >
                    <img src={bag2Image} alt="" />
                </figure>
            </div>
        </nav>
    );
}