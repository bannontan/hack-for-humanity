import React, { useState } from 'react';
import BottomNavBar from '../../Components/BottomNavbar';
import Map from '../../Components/Map';
import { useUser } from '../../UserContext';
import { FaExclamationTriangle, FaFire, FaPlus, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { FaAmbulance, FaUtensils, FaUserMd, FaClock } from 'react-icons/fa';

import './UserHome.css';

function Home() {
  const { user } = useUser();

  const [activeTab, setActiveTab] = useState('disasters');

  // Fake disaster data with multiple images
  const disasters = [
    {
      id: 1,
      event: 'Earthquake',
      city: 'San Francisco',
      severity: 'High',
      description: 'A severe earthquake has struck the area causing significant damage.',
      images: ['/images/earthquake1.jpg', '/images/earthquake2.jpg'],
    },
    {
      id: 2,
      event: 'Flooding',
      city: 'New York',
      severity: 'Medium',
      description: 'Heavy rains have led to flooding in parts of the city.',
      images: ['/images/flood1.jpg', '/images/flood2.jpg'],
    },
    {
      id: 3,
      event: 'Fire',
      city: 'Los Angeles',
      severity: 'High',
      description: 'A wildfire is spreading rapidly in the area.',
      images: ['/images/fire1.jpg', '/images/fire2.jpg'],
    },
  ];

  // Fake data for help available
  const helpList = [
    {
      id: 1,
      type: 'First Aid',
      location: 'San Francisco',
      relatedEvent: 'Earthquake',
      waitingTime: '15 minutes',
      distance: '1 mile',
      description: 'First aid and medical assistance available.',
    },
    {
      id: 2,
      type: 'Water/Food',
      location: 'New York',
      relatedEvent: 'Flooding',
      waitingTime: '30 minutes',
      distance: '2 miles',
      description: 'Food and water distribution center',
    },
  ];

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
        <Map />
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
          Help Available
        </div>
      </div>



      {/* Content */}
      <section className="content-section">
        {activeTab === 'disasters' && (
          <div className="event-list">
            {disasters.map((disaster) => (
              <EventCard key={disaster.id} disaster={disaster} renderSeverityBadge={renderSeverityBadge} />
            ))}
          </div>
        )}
        {activeTab === 'help' && (
          <div className="help-tab">
            <div className="help-list">
              {helpList.map((help) => (
                <div key={help.id} className="help-card">

                  <div className="help-icon">
                    {renderIcon(help.type)} <h3>{help.type}</h3>
                  </div>

                  <div className="help-details">
                    <p><strong>Location:</strong> {help.location}</p>
                    <p><strong>Event:</strong> {help.relatedEvent}</p>
                    <p><strong>Distance:</strong> {help.distance}</p>
                    <p><strong>Waiting Time:</strong> {help.waitingTime}</p>
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

const EventCard = ({ disaster, renderSeverityBadge }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === disaster.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? disaster.images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="event-card">
      <div className="image-carousel">
        <button className="arrow-button" onClick={handlePrev}>
          <FaArrowLeft />
        </button>
        <img
          src={disaster.images[currentImageIndex]}
          alt={`${disaster.event} image ${currentImageIndex + 1}`}
          className="event-image"
        />
        <button className="arrow-button" onClick={handleNext}>
          <FaArrowRight />
        </button>
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
