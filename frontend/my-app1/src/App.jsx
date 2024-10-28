import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Weather from './components/Weather';
import Profile from './components/Profile';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/weather" element={<Weather />} /> 
          <Route path="/profile" element={<Profile />} /> 
          <Route path="/Home" element={<Home />} />
          <Route path="/createuser" element={<Register />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
