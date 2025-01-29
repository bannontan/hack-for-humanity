import React, { useState } from 'react';
import { FaBell, FaExclamationCircle, FaRegHandshake } from 'react-icons/fa';
import BottomNavBar from '../../Components/BottomNavbar';
import './UserNotifications.css';

const notificationsData = [
  {
    id: 1,
    type: 'status',
    message: 'Your help request status has changed to Pending.',
    time: '2 hours ago',
  },
  {
    id: 2,
    type: 'event',
    message: 'New disaster event reported nearby.',
    time: '3 hours ago',
  },
  {
    id: 3,
    type: 'service',
    message: 'New help service available nearby.',
    time: '1 day ago',
  },
];

const Notifications = () => {
  const [notifications] = useState(notificationsData);

  return (
    <div className="notifications-page">
        <div className="notif-header">
            <FaBell className="notif-header-icon" />
            <h1>NOTIFICATIONS</h1>
        </div>
      <div className="notification-list">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="notification-card"
          >
            <div className="notification-icon">
              {notification.type === 'status' && <FaRegHandshake size={24} />}
              {notification.type === 'event' && <FaExclamationCircle size={24} />}
              {notification.type === 'service' && <FaBell size={24} />}
            </div>
            <div className="notification-details">
              <p className="notification-message">{notification.message}</p>
              <span className="notification-time">{notification.time}</span>
            </div>
          </div>
        ))}
      </div>

      <BottomNavBar />

    </div>
  );
};

export default Notifications;
