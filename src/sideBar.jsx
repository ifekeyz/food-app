import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useLocation } from 'react-router-dom';
import logoImage from '../src/foodbank-images/foodbank-logo2.png';
import homeActiveImage from '../src/foodbank-images/home-active.png';
import storeInactiveImage from '../src/foodbank-images/store-inactive.png';
import historyInactiveImage from '../src/foodbank-images/history-inactive.png';
import profileInactiveImage from '../src/foodbank-images/profile-inactive.png';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';

function Sidebar({ sideBarShow, setSideBarShow }) {
  const { userInfo} = useUser();
  const history = useNavigate();
  const location = useLocation(); 

  const handleLogout = () => {
    sessionStorage.removeItem('userToken');
    sessionStorage.removeItem('userId');
    history('/login');
    
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className={`dashboard-side-bar ${sideBarShow ? 'showsidebar' : ''}`}>
      <img src={logoImage} alt="" className="foodbank-sidebar-logo" />
      <div className="sidebar-links">
        <NavLink to="/Dashboard" className={` ${isActive('/Dashboard') ? 'active' : ''}`}>
          <img src={homeActiveImage} alt="" />
          <p className="dashboard-page-indication">Home</p>
        </NavLink>
        <NavLink to="/Store" className={isActive('/Store') ? 'active' : ''}>
          <img src={storeInactiveImage} alt="" />
          <p >Store</p>
        </NavLink>
        <NavLink to="/History" className={isActive('/History') ? 'active' : ''}>
          <img src={historyInactiveImage} alt="" />
          <p>History</p>
        </NavLink>
        <NavLink to="/Profile" className={isActive('/Profile') ? 'active' : ''}>
          <img src={profileInactiveImage} alt="" />
          <p>Profile</p>
        </NavLink>
        <NavLink onClick={handleLogout} className={`logout ${isActive('/Logout') ? 'active' : ''}`} >
          <img src={historyInactiveImage} alt="" />
          <p>Logout</p>
        </NavLink>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  sideBarShow: PropTypes.bool.isRequired,
  setSideBarShow: PropTypes.func.isRequired,
};

export default Sidebar;
