import React, { useState, useEffect } from 'react';
import BottomNavBar from '../../Components/BottomNavbar';
import { useUser } from '../../UserContext';
import './createRequest.css';
import { FaPhoneAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const CreateRequest = () => {
  const { user } = useUser(); // Access user context
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [type, setRequestType] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

const helplineNumbers = [
  { type: "Police", number: "100" },
  { type: "Ambulance", number: "102" },
  { type: "Disaster Management", number: "108" },
  { type: "Child Helpline", number: "1098" },
];

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

      setIsSubmitted(true);
    };


  return (
    <div className="create-request-page">

      {!isSubmitted && (
        <h1>Hello {user?.username}!</h1>
      )}

      {!isSubmitted && (
        <p className="sub-heading">
          {user?.username   
            ? 'Please fill out the following form to submit a request for help:'
            : 'Please provide your details and fill out the form to submit a request for help:'}
        </p>
      )}


      {!isSubmitted ? (
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
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || parseInt(value) > 0) {
                        setAge(value);
                      }
                    }}
                    min="1"
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
      ) : (
        <div className="success-screen">
          <h1>
            <span role="img" aria-label="success-icon">✅</span> Your Request Has Been Received!
          </h1>
          <p>
            Don't worry, the relevant support teams will come and help you/reach out to you. In the meantime, stay protected. Here are some helpline numbers:
          </p>
          <ul className="helpline-list">
            {helplineNumbers.map((helpline, index) => (
              <li key={index} className="helpline-item">
                <span className="helpline-icon">
                  <FaPhoneAlt />
                </span>
                <strong>{helpline.type}:</strong> {helpline.number}
              </li>
            ))}
          </ul>
          <div className="button-container">
            <button
              onClick={() => setIsSubmitted(false)}
              className="reset-button primary-button"
            >
              Submit Another Request
            </button>
            <button
              className="reset-button secondary-button"
              onClick={() => navigate('/home')}
            >
              Return to Home
            </button>
          </div>
        </div>

      )}

        <BottomNavBar />

    </div>
  );
}

export default CreateRequest;