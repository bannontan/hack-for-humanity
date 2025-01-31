import React, { useState, useEffect } from 'react';
import { FaUser, FaLocationArrow, FaClipboardCheck, FaFire } from 'react-icons/fa';
import BottomNavBar from '../../Components/BottomNavbar';
import { FaAmbulance, FaUtensils, FaUserMd, FaClock } from 'react-icons/fa';
import './AdminRequests.css';

function AdminRequests() {
  const [helpList, setHelpList] = useState([]);

  useEffect(() => {
    const fetchHelpList = async () => {
      try {
        const response = await fetch('http://localhost:8080/map/loc/admin');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setHelpList(data);
      } catch (error) {
        console.error('Error occurred while fetching help:', error);
      }
    };

    fetchHelpList();
  }, []); // Runs once when the component mounts

  const statusOrder = ['Pending', 'Approved', 'Completed'];

  // Handle status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      // Find the request that needs to be updated
      const requestToUpdate = helpList.find((help) => help.id === id);
      if (!requestToUpdate) {
        console.error('Request not found');
        return;
      }
  
      // Prepare updated data
      const updatedRequest = { ...requestToUpdate, status: newStatus };
  
      // Send API request
      const response = await fetch(`http://localhost:8080/map/loc/2`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedRequest),
      });
  
      if (!response.ok) {
        throw new Error(`Failed to update status: ${response.status}`);
      }
  
      // Update the local state after successful API call
      const updatedRequests = helpList.map((help) =>
        help.id === id ? { ...help, status: newStatus } : help
      );

      // Resort the updated list
      const sortedRequests = updatedRequests.sort(
        (a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
      );
  
      setHelpList(sortedRequests); // Update state with the new status

      console.log('Updated successfully:', updatedRequests);
    } catch (error) {
      console.error('Error updating status:', error);
    }
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
        {helpList.map((request) => (
          <div key={request.id} className={`request-card status-${request.status.toLowerCase()}`}>
            <div className="card-header">
              <h2><FaUser /> {request.user.username}, {request.user.age}</h2> 
              <p className="request-type">{renderIcon(request.type)} {request.type}</p>            </div>
            <p className="location"><FaLocationArrow /> {request.address}</p>
            <p className="description">{request.description}</p>
            <div className="status-section">
              <FaClipboardCheck /> 
              <select
                value={request.status}
                onChange={(e) => handleStatusChange(request.id, e.target.value)}
                className="status-dropdown"
              >
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
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
