import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [id, setId] = useState(''); // Updated: 'id' instead of 'email'
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

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
      console.log('1');

      if (!response.ok) {
        const { message } = await response.json();
        setErrorMessage(message || 'Invalid login credentials');
        console.log('2');
        return;
      }

      console.log('3');
      const data = await response.json();
      console.log(data);
      if (data.bool && data.role === 'admin') {
        navigate('/home', { state: { username: data.username } });
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
          type="text" // Updated: Changed type to 'text' for ID
          placeholder="Enter your ID" // Updated: Placeholder reflects 'ID'
          value={id}
          onChange={(e) => setId(e.target.value)} // Updated: Updates 'id' state
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
