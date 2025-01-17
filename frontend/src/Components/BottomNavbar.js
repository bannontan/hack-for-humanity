import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaListUl, FaBell, FaCog, FaPlus } from 'react-icons/fa';
import './BottomNavbar.css';

const BottomNavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="bottom-navbar">
        <button className='nav-item' onClick={() => navigate('/home')}>
            <FaHome size={24}/>
            <p>Home</p>
        </button>

        <button className='nav-item' onClick={() => navigate('/requests')}>
            <FaListUl size={24}/>
            <p>Requests</p>
        </button>

        <button className='nav-item' onClick={() => navigate('/createrequest')}>
            <FaPlus size={24} className="plus-icon"/>
        </button>

        <button className='nav-item' onClick={() => navigate('/notifications')}>
            <FaBell size={24}/>
            <p>Notifications</p>
        </button>

        <button className='nav-item' onClick={() => navigate('/settings')}>
            <FaCog size={24}/>
            <p>Settings</p>
        </button>

    </div>
  );
};

export default BottomNavBar;
