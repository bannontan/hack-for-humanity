import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserProvider } from './UserContext'; // Import the UserProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider> {/* Wrap App with UserProvider */}
      <App />
    </UserProvider>
  </React.StrictMode>
);
