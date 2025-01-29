import React, { useState, useEffect } from 'react';
import BottomNavBar from '../../Components/BottomNavbar';
import { FaCheckCircle, FaClock, FaClipboard } from 'react-icons/fa';
import './UserRequests.css';

function UserRequests() {
  const[userRequests, setUserRequests] = useState([]); // State for user requests

  useEffect(() => {
      const fetchUserRequests = async () => {
        try {
          const response = await fetch("http://localhost:8080/map/user/2");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

          setUserRequests(sortedData);
        } catch (error) {
          console.error('Error occurred:', error);
        }
      }; 
  
      fetchUserRequests();
    }, []);

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
              <p><strong>Date:</strong> {new Date(request.createdAt).toLocaleDateString()}</p>
              <p><strong>Time:</strong> {new Date(request.createdAt).toLocaleTimeString()}</p>
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
