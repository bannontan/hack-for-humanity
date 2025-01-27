import React, { useState, useEffect } from 'react';
import BottomNavBar from '../../Components/BottomNavbar';
import Map from '../../Components/Map';
import { FaExclamationTriangle, FaFire, FaPlus } from 'react-icons/fa';
import { FaAmbulance, FaUtensils, FaUserMd, FaClock } from 'react-icons/fa';
import { GiEarthCrack } from 'react-icons/gi'; // Earthquake
import { WiFlood } from 'react-icons/wi';    // Flooding

import './UserHome.css';

function Home() {
  const [disasters, setDisasters] = useState([]); // State for disasters
  const [helpList, setHelpList] = useState([]); // State for help list
  const [activeTab, setActiveTab] = useState('disasters');

  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        const response = await fetch("http://localhost:8080/disaster");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setDisasters(data); // Set disasters from API response
      } catch (error) {
        console.error('Error occurred:', error);
      }
    }; 

    fetchDisasters();
  }, []);

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

  // Helper function to render severity badges
  const renderSeverityBadge = (severity) => {
    if (severity === 'High') {
      return <span className="badge high-severity"><FaFire style={{ marginRight: '4px' }} />High</span>;
    }
    if (severity === 'Medium') {
      return <span className="badge medium-severity"><FaExclamationTriangle style={{ marginRight: '4px' }} />Medium</span>;
    }
    return <span className="badge low-severity"><FaPlus style={{ marginRight: '4px' }} />Low</span>;
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

  const renderEventIcon = (event, size) => {
    switch (event) {
      case 'Flooding':
        return <WiFlood size={size}/>;
      case 'Earthquake':
        return <GiEarthCrack size={size}/>;
      case 'Fire':
        return <FaFire size={size}/>;
      default:
        return <FaExclamationTriangle size={size} />; // Default icon
    }
  };

  return (
    <div className="home-page">

      <header className="app-header">
        <div className="logo">
          <img src="/images/logo-placeholder.png" alt="App Logo" />
        </div>
        <h1>REscue</h1>
        <p className="slogan">Connecting Communities, Empowering Responses</p>
      </header>

      <div className="map-section">
        <Map role="user"/>
      </div>

      {/* Tab Bar */}
      <div className="tab-bar" role="tablist">
        <div
          className={`tab ${activeTab === 'disasters' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('disasters')}
          role="tab"
          aria-selected={activeTab === 'disasters'}
        >
          Active Disaster Events
        </div>
        <div
          className={`tab ${activeTab === 'help' ? 'active-tab' : ''}`}
          onClick={() => setActiveTab('help')}
          role="tab"
          aria-selected={activeTab === 'help'}
        >
          All Help Available
        </div>
      </div>



      {/* Content */}
      <section className="content-section">
        {activeTab === 'disasters' && (
          <div className="event-list">
            {disasters.map((disaster) => (
              <EventCard key={disaster.id} disaster={disaster} renderSeverityBadge={renderSeverityBadge} renderEventIcon={renderEventIcon} />
            ))}
          </div>
        )}
        {activeTab === 'help' && (
          <div className="help-tab">
            <div className="help-list">
              {helpList.map((help) => (
                <div key={help.adminID} className="help-card">

                  <div className="help-icon">
                    {renderIcon(help.helpType)} <h3>{help.helpType}</h3>
                  </div>

                  <div className="help-details">
                    <p><strong>Location:</strong> {help.address}</p>
                    <p><strong>Event:</strong> {help.disasterName}</p>
                    <p><strong>Distance:</strong> DISTANCE TBD</p>
                    <p><strong>Waiting Time:</strong> {help.waitingTime} Minutes</p>
                    <p>----</p>
                    <p>{help.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <BottomNavBar />
    </div>
  );
}

const EventCard = ({ disaster, renderSeverityBadge, renderEventIcon }) => {

  return (
    <div className="event-card">
      <div className="image-carousel">
        {renderEventIcon(disaster.event, 64)}
      </div>
      <div className="event-details">
        <h3>{disaster.event}</h3>
        <p><strong>Location:</strong> {disaster.city}</p>
        <p><strong>Severity:</strong> {renderSeverityBadge(disaster.severity)}</p>
        <p>{disaster.description}</p>
        <a href={`/disaster/${disaster.id}`} className="help-link">
          See what help is available
        </a>
      </div>
    </div>
  );
};

export default Home;
