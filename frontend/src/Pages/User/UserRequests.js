import React from 'react';
import BottomNavBar from '../../Components/BottomNavbar';
import { FaCheckCircle, FaClock, FaClipboard } from 'react-icons/fa';
import './UserRequests.css';

function UserRequests() {
  // Fake user requests data
  const userRequests = [
    {
      id: 1,
      type: 'Food Aid',
      status: 'Accepted',
      date: '2025-01-24',
      time: '14:30',
      description: 'Request for food packets for a family of 4.',
    },
    {
      id: 2,
      type: 'Medical Assistance',
      status: 'Pending',
      date: '2025-01-25',
      time: '09:00',
      description: 'Urgent medical aid required for an injured person.',
    },
    {
      id: 3,
      type: 'Shelter Request',
      status: 'Accepted',
      date: '2025-01-23',
      time: '17:15',
      description: 'Temporary shelter needed for two days.',
    },
    {
        id: 4,
        type: 'Food Aid',
        status: 'Accepted',
        date: '2025-01-24',
        time: '14:30',
        description: 'Request for water packets for a family of 4.',
      },
  ];

  // Status icon
  const renderStatusIcon = (status) => {
    if (status === 'Accepted') {
      return <FaCheckCircle className="status-icon accepted" />;
    }
    if (status === 'Pending') {
      return <FaClock className="status-icon pending" />;
    }
    return null;
  };

  return (
    <div className="user-requests-page">
      <div className="page-header">
        <FaClipboard className="page-header-icon" />
        <h1>YOUR REQUESTS</h1>
      </div>
      
      <section className="requests-list">
        {userRequests.map((request) => (
          <div key={request.id} className="request-card">
            <div className="request-header">
              <div className="request-type">
                {renderStatusIcon(request.status)}
                <h3>{request.type}</h3>
              </div>
              <span className={`status-label ${request.status.toLowerCase()}`}>{request.status}</span>
            </div>
            <div className="request-details">
              <p><strong>Date:</strong> {request.date}</p>
              <p><strong>Time:</strong> {request.time}</p>
              <p><strong>Description:</strong> {request.description}</p>
            </div>
          </div>
        ))}
      </section>

      <BottomNavBar />
    </div>
  );
}

export default UserRequests;
