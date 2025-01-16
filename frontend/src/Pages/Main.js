import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Main.css';

const Main = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSkipClick = () => {
    navigate('/home');
  };

  return (
    <div className="main-page">
      <h1>Disaster Relief App</h1>
      <p className="subtitle">
        Helping those in need with real-time disaster reporting and rescue efforts.
      </p>
      <div className="buttons">
        <button onClick={handleLoginClick} className="login-button">
          Login
        </button>
        <button onClick={handleSkipClick} className="skip-button">
          Skip to Home Page
        </button>
      </div>
    </div>
  );
};

export default Main;
