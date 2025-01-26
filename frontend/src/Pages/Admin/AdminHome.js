import React, { useState } from 'react';
import BottomNavBar from '../../Components/BottomNavbar';
import Map from '../../Components/Map';
import { FaExclamationCircle, FaFire, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import HelpForm from './AdminCreateHelpEvent';

import './AdminHome.css';

function AdminHome() {

  // Fake disaster data
  const [disasters, setDisasters] = useState([
    {
      id: 1,
      event: 'Earthquake',
      city: 'San Francisco',
      distance: 10,
      severity: 'High',
      help: [
        { type: 'First Aid', location: 'Central Hospital', distance: 3, waitTime: '10' },
        { type: 'Water/Food', location: 'Relief Center A', distance: 2, waitTime: '5' },
      ],
    },
    {
      id: 2,
      event: 'Flooding',
      city: 'New York',
      distance: 50,
      severity: 'Medium',
      help: [
        { type: 'Psychological', location: 'Counseling Center B', distance: 7, waitTime: '15' },
        { type: 'Water/Food', location: 'Relief Center C', distance: 10, waitTime: '20' },
      ],
    },
    {
      id: 3,
      event: 'Fire',
      city: 'Los Angeles',
      distance: 5,
      severity: 'High',
      help: [
        { type: 'Firefighter', location: 'Fire Station 1', distance: 1, waitTime: '5' },
        { type: 'First Aid', location: 'Hospital D', distance: 4, waitTime: '12' },
      ],
    },
  ]);

  // State to manage the form visibility
  const [showForm, setShowForm] = useState(false);

  // Sort disasters by distance (nearest first)
  const sortedDisasters = disasters.sort((a, b) => a.distance - b.distance);

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
        <h1>Admin Homepage</h1>
        <p>View existing disasters and help requests.</p>

        {/* Placeholder for the map */}
        <div className="map-placeholder">
          <Map role="admin"/>
        </div>

        {/* Show HelpForm if showForm is true */}
        {showForm && (
          <HelpForm
            disasters={disasters}
            setDisasters={setDisasters}
            setShowForm={setShowForm}
          />
        )}

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
              {sortedDisasters.map((disaster) => (
                <React.Fragment key={disaster.id}>
                  {/* Main disaster row */}
                  <tr className={`disaster`}>
                    <td className={`${disaster.severity.toLowerCase()}-severity-icon`}>
                      <FaExclamationCircle /> {disaster.event}
                    </td>
                    <td className={`${disaster.severity.toLowerCase()}-severity-icon`}>
                      {disaster.city}
                    </td>
                    <td className={`${disaster.severity.toLowerCase()}-severity-icon`}>
                      {disaster.distance} miles
                    </td>
                    <td>{renderSeverityIcon(disaster.severity)}</td>
                  </tr>

                  {/* Subtable for help details */}
                  <tr>
                    <td colSpan="4">
                      <table className="help-subtable">
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Help Type</th>
                            <th>Location</th>
                            <th>Distance (miles)</th>
                            <th>Waiting Time (mins)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {disaster.help.map((help, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{help.type}</td>
                              <td>{help.location}</td>
                              <td>{help.distance} miles away</td>
                              <td>{help.waitTime}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <BottomNavBar setShowForm={setShowForm} />
    </div>
  );
}

export default AdminHome;
