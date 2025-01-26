import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaListUl, FaBell, FaCog, FaPlus } from 'react-icons/fa';
import './BottomNavbar.css';
import { useUser } from '../UserContext';

const BottomNavBar = ({ setShowForm }) => {
    const navigate = useNavigate();
    const { user } = useUser();

    // Determine paths based on the user role
    const homePath = user?.role === 'admin' ? '/AdminHome' : '/home';
    const requestsPath = user?.role === 'admin' ? '/AdminRequests' : '/requests';
    const createRequestPath = user?.role === 'admin' ? '/AdminCreateHelpEvent' : '/createrequest';
    const notificationsPath = user?.role === 'admin' ? '/AdminNotifications' : '/notifications';
    const settingsPath = user?.role === 'admin' ? '/AdminSettings' : '/settings';

    // Handle button click based on user role
    const handleCreateRequestClick = () => {
        if (user?.role === 'admin') {
        setShowForm(true); // If the user is an admin, show the form
        } else {
        navigate(createRequestPath); // If the user is not an admin, navigate to the create request page
        }
    };

  return (
    <div className="bottom-navbar">
        <button className='nav-item' onClick={() => navigate(homePath)}>
            <FaHome size={24}/>
            <p>Home</p>
        </button>

        <button className='nav-item' onClick={() => navigate(requestsPath)}>
            <FaListUl size={24}/>
            <p>Requests</p>
        </button>

        <button className='nav-item create-btn' onClick={() => handleCreateRequestClick()}>
            <FaPlus size={24} />
        </button>

        <button className='nav-item' onClick={() => navigate(notificationsPath)}>
            <FaBell size={24}/>
            <p>Notifications</p>
        </button>

        <button className='nav-item' onClick={() => navigate(settingsPath)}>
            <FaCog size={24}/>
            <p>Settings</p>
        </button>
    </div>
  );
};

export default BottomNavBar;
