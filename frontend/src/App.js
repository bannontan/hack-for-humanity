import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Main from './Pages/Main';
import CreateRequest from './Pages/createRequest';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createrequest" element={<CreateRequest />} />
      </Routes>
    </Router>
  );
};

export default App;
