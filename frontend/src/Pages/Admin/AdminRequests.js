import React, { useState } from 'react';
import { FaUser, FaLocationArrow, FaClipboardCheck, FaFire } from 'react-icons/fa';
import BottomNavBar from '../../Components/BottomNavbar';
import { FaAmbulance, FaUtensils, FaUserMd, FaClock } from 'react-icons/fa';
import './AdminRequests.css';

function AdminRequests() {
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: 'John Doe',
      age: 32,
      type: 'First Aid',
      location: 'San Francisco',
      description: 'Need urgent medical attention for a broken leg.',
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 45,
      type: 'Water/Food',
      location: 'New York',
      description: 'Requesting food supplies for a family of four.',
      status: 'Pending',
    },
    {
      id: 3,
      name: 'Michael Johnson',
      age: 28,
      type: 'Firefighter',
      location: 'Los Angeles',
      description: 'Looking for temporary shelter due to flooding.',
      status: 'Completed',
    },
  ]);

  // Sort requests by status order
  const statusOrder = ['Pending', 'Help Sent', 'Completed'];
  const sortedRequests = [...requests].sort(
    (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
  );

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    const updatedRequests = requests.map((request) =>
      request.id === id ? { ...request, status: newStatus } : request
    );
    setRequests(updatedRequests);
  };

  const renderIcon = (helpType) => {
      switch (helpType) {
        case 'First Aid':
          return <FaAmbulance />;
        case 'Water/Food':
          return <FaUtensils />;
        case 'Psychological Support':
          return <FaUserMd />;
        case 'Waiting Time':
          return <FaClock />;
        case 'Firefighter':
          return <FaFire />;
        default:
          return <FaAmbulance />; // Default icon
      }
  };

  return (
    <div className="admin-requests">
      <h1>Help Requests Dashboard</h1>
      <p className="subtitle">View and manage all submitted help requests below.</p>

      <div className="requests-container">
        {sortedRequests.map((request) => (
          <div key={request.id} className={`request-card status-${request.status.toLowerCase()}`}>
            <div className="card-header">
              <h2><FaUser /> {request.name}, {request.age}</h2> 
              <p className="request-type">{renderIcon(request.type)} {request.type}</p>            </div>
            <p className="location"><FaLocationArrow /> {request.location}</p>
            <p className="description">{request.description}</p>
            <div className="status-section">
              <FaClipboardCheck /> 
              <select
                value={request.status}
                onChange={(e) => handleStatusChange(request.id, e.target.value)}
                className="status-dropdown"
              >
                <option value="Pending">Pending</option>
                <option value="Help Sent">Help Sent</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>
        ))}
      </div>

      <BottomNavBar />
    </div>
  );
}

export default AdminRequests;
