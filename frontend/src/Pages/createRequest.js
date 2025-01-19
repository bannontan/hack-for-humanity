import React, { useState, useEffect } from 'react';
import BottomNavBar from '../Components/BottomNavbar';
import { useUser } from '../UserContext';
import './createRequest.css';

const CreateRequest = () => {
  const { user } = useUser(); // Access user context
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [type, setRequestType] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');

  // Prefill name and age if user is logged in
  useEffect(() => {
    if (user?.username) {
      setName(user?.username || ''); // Use `user.name` or an empty string if not present
      setAge(user?.age || ''); // Use `user.age` or an empty string if not present
      setUserId(user?.id || '');
      console.log('User:', user);
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ userId, name, age, type, address, description });

    try {
        const response = await fetch('http://localhost:8080/map/user/loc', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ address, description, type, userId }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Response Data:', data);
      } catch (error) {
          console.error('Error occurred:', error);
      }
  };


  return (
    <div className="create-request-page">
      <h1>Hello {user?.username || 'there'},</h1>
      <p className="sub-heading">
        {user?.username   
          ? 'Please fill out the following form to submit a request for help:'
          : 'Please provide your details and fill out the form to submit a request for help:'}
      </p>

      <form onSubmit={handleSubmit} className="request-form">
        {!user?.username && (
          <>
            <div className="form-group">
              <label>Name<span style={{ color: 'red' }}>*</span>:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={user?.username}
                required
              />
            </div>
            <div className="form-group">
              <label>Age<span style={{ color: 'red' }}>*</span>:</label>
              <input
                type="number"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                disabled={user?.username}
                required
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label>Request Type<span style={{ color: 'red' }}>*</span>:</label>
          <select
            name="type"
            value={type}
            onChange={(e) => setRequestType(e.target.value)}
            required
          >
            <option value="">Select Request Type</option>
            <option value="Medical">Medical</option>
            <option value="Food/Water">Food/Water</option>
            <option value="Firefighter">Firefighter</option>
            <option value="Other">Other (please explain in description)</option>
          </select>
        </div>

        <div className="form-group">
          <label>Location<span style={{ color: 'red' }}>*</span>:</label>
          <input
            type="text"
            name="location"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description of help needed:</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-button">
          Submit Request
        </button>
      </form>

        <BottomNavBar />

    </div>
  );
}

export default CreateRequest;