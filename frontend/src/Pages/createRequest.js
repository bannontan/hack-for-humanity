import React, { useState } from 'react';
import BottomNavBar from '../Components/BottomNavbar';
import { useUser } from '../UserContext';
import './createRequest.css';

const CreateRequest = () => {
  const { user } = useUser(); // Access user context
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [requestType, setRequestType] = useState('');
  const [otherRequest, setOtherRequest] = useState('');
  const [locationInput, setLocationInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, age, requestType, locationInput });
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
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Age:</label>
              <input
                type="number"
                name="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label>Request Type:</label>
          <select
            name="requestType"
            value={requestType}
            onChange={(e) => setRequestType(e.target.value)}
            required
          >
            <option value="">Select Request Type</option>
            <option value="Medical">Medical</option>
            <option value="Food/Water">Food/Water</option>
            <option value="Firefighter">Firefighter</option>
            <option value="Other">Other (please specify)</option>
          </select>
        </div>

        {requestType === 'Other' && (
          <div className="form-group">
            <label>Please specify:</label>
            <input
              type="text"
              name="otherRequest"
              value={otherRequest}
              onChange={(e) => setOtherRequest(e.target.value)}
              required
            />
          </div>
        )}

        <div className="form-group">
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            required
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