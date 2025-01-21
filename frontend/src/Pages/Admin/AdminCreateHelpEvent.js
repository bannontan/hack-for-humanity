import React, { useState } from 'react';
import './AdminCreateHelpEvent.css';

const HelpForm = ({ disasters, setDisasters, setShowForm }) => {
  const [newHelp, setNewHelp] = useState({
    event: '',
    type: '',
    location: '',
    distance: '',
    waitTime: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewHelp((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedDisasters = disasters.map((disaster) =>
      disaster.event === newHelp.event
        ? {
            ...disaster,
            help: [
              ...disaster.help,
              {
                type: newHelp.type,
                location: newHelp.location,
                distance: newHelp.distance,
                waitTime: newHelp.waitTime,
              },
            ],
          }
        : disaster
    );
    setDisasters(updatedDisasters);
    setShowForm(false); // Close the form
  };

  return (
    <div className="help-form-popup">
      <form onSubmit={handleSubmit} className="help-form">
        <h2>Add New Help</h2>

        {/* Event Dropdown */}
        <div className="form-group">
          <label>Event</label>
          <select
            name="event"
            value={newHelp.event}
            onChange={handleChange}
            required
          >
            {disasters.map((disaster) => (
              <option key={disaster.id} value={disaster.event}>
                {disaster.event}
              </option>
            ))}
          </select>
        </div>

        {/* Help Type Input */}
        <div className="form-group">
          <label>Help Type</label>
          <input
            type="text"
            name="type"
            value={newHelp.type}
            onChange={handleChange}
            required
          />
        </div>

        {/* Location Input */}
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={newHelp.location}
            onChange={handleChange}
            required
          />
        </div>

        {/* Distance Input */}
        <div className="form-group">
          <label>Distance (miles)</label>
          <input
            type="number"
            name="distance"
            value={newHelp.distance}
            onChange={handleChange}
            required
          />
        </div>

        {/* Waiting Time Input */}
        <div className="form-group">
          <label>Waiting Time</label>
          <input
            type="text"
            name="waitTime"
            value={newHelp.waitTime}
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
