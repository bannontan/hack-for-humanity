import React, { useState, useEffect } from 'react';
import BottomNavBar from '../../Components/BottomNavbar';
import Map from '../../Components/Map';
import { FaFire, FaCheckCircle, FaExclamationTriangle, FaMapMarkerAlt } from 'react-icons/fa';
import { FaAmbulance, FaUtensils, FaUserMd, FaClock } from 'react-icons/fa';
import HelpForm from './AdminCreateHelpEvent';
import './AdminHome.css';

function AdminHome() {
    const [helpList, setHelpList] = useState([]); // State for help list
    const [disasters, setDisasters] = useState([]); // State for disasters
    
  useEffect(() => {
      const fetchHelpList = async () => {
        try {
          const response = await fetch('http://localhost:8080/adminpost');
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          setHelpList(data);
        } catch (error) {
          console.error('Error occurred while fetching help:', error);
        }
      };
  
      fetchHelpList();
  }, []);

  useEffect(() => {
      const fetchDisasters = async () => {
        try {
          const response = await fetch("http://localhost:8080/disaster");
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          const sortedData = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setDisasters(sortedData);
        } catch (error) {
          console.error('Error occurred:', error);
        }
      }; 
  
      fetchDisasters();
    }, []);

  const [showForm, setShowForm] = useState(false);

  // Helper function to render severity icons with labels
  const renderSeverityIcon = (severity) => {
    if (severity === 'High') {
      return (
        <div className="admin-disaster-severity">
          <FaFire className="admin-high-severity-icon" />
          <span style={{ color: '#e74c3c' }}>High</span>
        </div>
      );
    }
    if (severity === 'Medium') {
      return (
        <div className="admin-disaster-severity">
          <FaExclamationTriangle className="admin-medium-severity-icon" />
          <span style={{ color: '#f39c12' }}>Medium</span>
        </div>
      );
    }
    return (
      <div className="admin-disaster-severity">
        <FaCheckCircle className="admin-low-severity-icon" />
        <span style={{ color: '#2ecc71' }}>Low</span>
      </div>
    );
  };

  const renderIcon = (helpType) => {
      switch (helpType) {
        case 'First Aid':
          return <FaAmbulance />;
        case 'Water/Food':
          return <FaUtensils />;
        case 'Psychological Support':
          return <FaUserMd />;
        case 'Waiting Time':
          return <FaClock />;
        default:
          return <FaAmbulance />; // Default icon
      }
    };

  return (
    <div className="admin-home-page">
      <div className="admin-content">
        <h1 className="admin-title">Admin Homepage</h1>
        <p className="admin-description">View active disasters and help requests</p>

        {/* Map Placeholder */}
        <div className="admin-map-placeholder">
          <Map role="admin" />
        </div>

        {/* Show HelpForm if showForm is true */}
        {showForm && (
          <HelpForm
            disasters={disasters}
            setDisasters={setDisasters}
            setShowForm={setShowForm}
          />
        )}

        {/* List of Disaster Events as Cards */}
        <div className="admin-disaster-cards-container">
          {disasters.map((disaster) => (
            <div key={disaster.id} className="admin-disaster-card">
              {/* Disaster Header */}
              <div className="admin-disaster-header">
                <h3 className="admin-disaster-event">{disaster.event}</h3>
                {renderSeverityIcon(disaster.severity)}
              </div>

              {/* Disaster Details */}
              <div className="admin-disaster-details">
                <div className="admin-disaster-location">
                  <FaMapMarkerAlt />
                  <span>{disaster.city}</span>
                </div>
                <div className="admin-disaster-distance">
                  <span>{disaster.distance} miles</span>
                </div>
              </div>

              {/* Help Details */}
              <div className="admin-help-section">
                <h4 className="admin-help-title">Help Available</h4>
                <ul className="admin-help-list">
                  {helpList.map((help) => (
                    <li key={help.id} className="admin-help-item">
                      <div className="admin-help-item-content">
                        <div className="admin-help-type">
                          {renderIcon(help.type)}
                          <span className="admin-help-type-text">{help.helpType}</span>
                        </div>
                        <div className="admin-help-details">
                          <span className="admin-help-location">{help.location}</span>
                          <span className="admin-help-distance">({help.distance} miles away)</span>
                        </div>
                      </div>
                      <div className="admin-help-wait-time">
                        Wait time: <span>{help.waitingTime} mins</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>
      </div>
      <BottomNavBar setShowForm={setShowForm} />
    </div>
  );
}

export default AdminHome;
