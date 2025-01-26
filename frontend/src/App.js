import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/User/UserHome';
import Login from './Pages/Login';
import Main from './Pages/Main';
import UserRequests from './Pages/User/UserRequests';
import UserNotification from './Pages/User/UserNotifications';
import CreateRequest from './Pages/User/createRequest';
import AdminHome from './Pages/Admin/AdminHome';
import AdminRequests from './Pages/Admin/AdminRequests';
import AdminCreateRequest from './Pages/Admin/AdminCreateHelpEvent';
// import AdminNotifications from './Pages/Admin/AdminNotifications';
// import AdminSettings from './Pages/Admin/AdminSettings';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/requests" element={<UserRequests />} />
        <Route path="/notifications" element={<UserNotification />} />
        <Route path="/createrequest" element={<CreateRequest />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/adminrequests" element={<AdminRequests />} />
        <Route path="/admincreaterequest" element={<AdminCreateRequest />} />
        {/* <Route path="/adminnotifications" element={<AdminNotifications />} /> */}
        {/* <Route path="/adminsettings" element={<AdminSettings />} /> */}

      </Routes>
    </Router>
  );
};

export default App;
