import React, { useState } from 'react';
import './AdminCreateHelpEvent.css';

const HelpForm = ({ disasters, setDisasters, setShowForm }) => {
  const [newHelp, setNewHelp] = useState({
    helpType: '',
    waitingTime: '',
    description: '',
    address: '',
    disasterName: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHelp((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Submitting help data:', {
      helpType: newHelp.helpType,
      address: newHelp.address,
      waitingTime: newHelp.waitingTime,
      disasterName: newHelp.disasterName,
      description: newHelp.description,
    });
    

    try {
      // Send data to the API
      const response = await fetch('http://localhost:8080/adminpost/1', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          helpType: newHelp.helpType,
          address: newHelp.address,
          waitingTime: newHelp.waitingTime,
          disasterName: "SF Flooding",
          description: newHelp.description,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send help data to API');
      }

      // Assuming the response contains updated disaster data, or fetch the updated list
      const updatedDisasters = await response.json();

      setDisasters(updatedDisasters); // Update the state with the new disaster data
      setShowForm(false); // Close the form

    } catch (error) {
      console.error('Error submitting help data:', error);
    }
  };

  return (
    <div className="help-form-popup">
      <form onSubmit={handleSubmit} className="help-form">
        <h2>Add New Help</h2>

        {/* Event Dropdown */}
        <div className="form-group">
          <label>Event</label>
          <select
            name="disasterName"
            value={newHelp.disasterName}
            onChange={handleChange}
            required
          >
            {disasters.map((disaster) => (
              <option key={disaster.id} value={disaster.name}>
                {disaster.name}
              </option>
            ))}
          </select>
        </div>

        {/* Help Type Input */}
        <div className="form-group">
          <label>Help Type</label>
          <input
            type="text"
            name="helpType"
            value={newHelp.helpType}
            onChange={handleChange}
            required
          />
        </div>

        {/* Location Input */}
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="address"
            value={newHelp.address}
            onChange={handleChange}
            required
          />
        </div>

        {/* Waiting Time Input */}
        <div className="form-group">
          <label>Waiting Time</label>
          <input
            type="number"
            name="waitingTime"
            value={newHelp.waitingTime}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description Input */}
        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={newHelp.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button type="submit">Submit</button>
        <button type="button" onClick={() => setShowForm(false)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default HelpForm;
