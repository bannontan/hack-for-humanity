import React, { useState } from 'react';
import { FaUser, FaLocationArrow, FaFileAlt, FaClipboardCheck } from 'react-icons/fa';
import BottomNavBar from '../../Components/BottomNavbar';
import './AdminRequests.css';

function AdminRequests() {
  // State to manage requests
  const [requests, setRequests] = useState([
    {
      id: 1,
      name: 'John Doe',
      age: 32,
      type: 'Medical',
      location: 'San Francisco',
      description: 'Need urgent medical attention for a broken leg.',
      status: 'Pending',
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 45,
      type: 'Food',
      location: 'New York',
      description: 'Requesting food supplies for a family of four.',
      status: 'Help Sent',
    },
    {
      id: 3,
      name: 'Michael Johnson',
      age: 28,
      type: 'Shelter',
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

  return (
    <div className="admin-requests">
      <h1>Help Requests Dashboard</h1>
      <p className="subtitle">View and manage all submitted help requests below.</p>

      <div className="requests-table-container">
        <table className="requests-table">
          <thead>
            <tr>
              <th><FaUser /> Name</th>
              <th>Age</th>
              <th><FaFileAlt /> Type of Request</th>
              <th><FaLocationArrow /> Location</th>
              <th>Description</th>
              <th><FaClipboardCheck /> Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedRequests.map((request) => (
              <tr key={request.id} className={`status-${request.status.toLowerCase()}`}>
                <td>{request.name}</td>
                <td>{request.age}</td>
                <td>{request.type}</td>
                <td>{request.location}</td>
                <td>{request.description}</td>
                <td>
                  <select
                    value={request.status}
                    onChange={(e) => handleStatusChange(request.id, e.target.value)}
                    className="status-dropdown"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Help Sent">Help Sent</option>
                    <option value="Completed">Completed</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <BottomNavBar />
    </div>
  );
}

export default AdminRequests;
