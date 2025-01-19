import React from 'react';
import BottomNavBar from '../Components/BottomNavbar';
import Map from '../Components/Map';
import { useUser } from '../UserContext';
import { FaExclamationCircle, FaFire, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';
import { FaPlus , FaUtensils, FaFireExtinguisher, FaUserMd } from 'react-icons/fa'; // Add relevant icons

import './Home.css';

function Home() {
  const { user } = useUser(); // Access user context

  // Fake disaster data
  const disasters = [
    {
      id: 1,
      event: 'Earthquake',
      city: 'San Francisco',
      distance: 10, // Distance in miles
      severity: 'High',
      help: [
        { type: 'First Aid', location: 'Central Hospital', distance: 3, waitTime: '10 mins' },
        { type: 'Water/Food', location: 'Relief Center A', distance: 2, waitTime: '5 mins' },
      ],
    },
    {
      id: 2,
      event: 'Flooding',
      city: 'New York',
      distance: 50,
      severity: 'Medium',
      help: [
        { type: 'Psychological', location: 'Counseling Center B', distance: 7, waitTime: '15 mins' },
        { type: 'Water/Food', location: 'Relief Center C', distance: 10, waitTime: '20 mins' },
      ],
    },
    {
      id: 3,
      event: 'Fire',
      city: 'Los Angeles',
      distance: 5,
      severity: 'High',
      help: [
        { type: 'Firefighter', location: 'Fire Station 1', distance: 1, waitTime: '5 mins' },
        { type: 'First Aid', location: 'Hospital D', distance: 4, waitTime: '12 mins' },
      ],
    },
  ];

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

  // Map help types to icons
  const getHelpIcon = (type) => {
    switch (type) {
      case 'First Aid':
        return <FaPlus className="help-icon" />;
      case 'Water/Food':
        return <FaUtensils className="help-icon" />;
      case 'Firefighter':
        return <FaFireExtinguisher className="help-icon" />;
      case 'Psychological':
        return <FaUserMd className="help-icon" />;
      default:
        return <FaExclamationCircle className="help-icon" />;
    }
  };

  return (
    <div className="home-page">
      <div className="content">
        <h1>Disaster Relief for {user?.username || 'User'}</h1>
        <p>Empowering communities with real-time disaster management solutions.</p>

        {/* Placeholder for the map */}
        <div className="map-placeholder">
          <Map />
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
              {sortedDisasters.map((disaster) => (
                <React.Fragment key={disaster.id}>

                  {/* Main disaster row */}
                  <tr className={`disaster`}>
                      <td className={`${disaster.severity.toLowerCase()}-severity-icon`}>
                        <FaExclamationCircle /> {disaster.event}
                      </td>
                      <td className={`${disaster.severity.toLowerCase()}-severity-icon`}>{disaster.city}</td>
                      <td className={`${disaster.severity.toLowerCase()}-severity-icon`}>{disaster.distance} miles</td>
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
                            <th>Distance</th>
                            <th>Waiting Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {disaster.help.map((help, index) => (
                            <tr key={index}>
                              <td>{index + 1}</td>
                              <td>
                                {getHelpIcon(help.type)} {help.type}
                              </td>
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
      <BottomNavBar />
    </div>
  );
}

export default Home;
