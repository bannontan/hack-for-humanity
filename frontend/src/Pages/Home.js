import React from 'react';
import { useLocation } from 'react-router-dom';
import './Home.css';

function Home() {
    const location = useLocation(); // Access location object
    const { username } = location.state || {}; // Extract username from state

    return (
        <div className="home-page">
            <div className="content">
                <h1>Disaster Relief for {username || 'User'}</h1>
                <p>Empowering communities with real-time disaster management solutions.</p>
            </div>
        </div>
    );
}

export default Home;
