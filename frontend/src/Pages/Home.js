import React from 'react';
import BottomNavBar from '../Components/BottomNavbar';
import { useUser } from '../UserContext';
import { FaExclamationCircle, FaFire, FaWater, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import './Home.css';

function Home() {
  const { user } = useUser(); // Access user context

  // Helper function to render severity icons
  const renderSeverityIcon = (severity) => {
    if (severity === 'High') {
      return <FaFire className="high-severity-icon" />;
    }
    if (severity === 'Medium') {
      return <FaExclamationTriangle className="medium-severity-icon" />;
    }
    return <FaCheckCircle className="low-severity-icon" />;
  };

  return (
    <div className="home-page">
      <div className="content">
        <h1>Disaster Relief for {user?.username || 'User'}</h1>
        <p>Empowering communities with real-time disaster management solutions.</p>

        {/* Placeholder for the map */}
        <div className="map-placeholder">
          <p>Map will be displayed here (placeholder)</p>
        </div>

        {/* Table of events */}
        <div className="event-table-container">
          <h2>Active Disaster Events</h2>
          <table className="event-table">
            <thead>
              <tr>
                <th>Event</th>
                <th>City</th>
                <th>Distance</th>
                <th>Severity</th>
              </tr>
            </thead>
            <tbody>
              <tr className="disaster">
                <td className="di"><FaExclamationCircle /> Earthquake</td>
                <td>San Francisco</td>
                <td>10 miles away</td>
                <td className="high-severity">{renderSeverityIcon('High')}</td>
              </tr>
              <tr className="disaster">
                <td className="di"><FaWater /> Flooding</td>
                <td>New York</td>
                <td>50 miles away</td>
                <td className="medium-severity">{renderSeverityIcon('Medium')}</td>
              </tr>
              <tr className="disaster">
                <td className="di"><FaFire /> Fire</td>
                <td>Los Angeles</td>
                <td>5 miles away</td>
                <td className="high-severity">{renderSeverityIcon('High')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <BottomNavBar />
    </div>
  );
}

export default Home;
