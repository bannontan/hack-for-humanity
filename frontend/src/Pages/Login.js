import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../UserContext'; // Import the context
import './Login.css';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { setUser } = useUser(); // Access the setUser method

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!id || !password) {
      setErrorMessage('Please enter both ID and password');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, password }),
      });

      if (!response.ok) {
        const { message } = await response.json();
        setErrorMessage(message || 'Invalid login credentials');
        return;
      }

      const data = await response.json();
      if (data.bool && data.role === 'admin') {
        setUser({ username: data.username }); // Save the user info in context
        navigate('/home');
      } else {
        setErrorMessage('Access denied: You are not an admin');
      }
    } catch (error) {
      setErrorMessage('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <h1>Login to RE App</h1>
      {errorMessage && <p>{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Enter your ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
