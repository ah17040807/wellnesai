// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Goals from './components/Goals';
import axios from 'axios'; // Ensure axios is imported

// Importing CSS files
import './styles/global.css';
import './styles/LoginForm.css';
import './styles/RegistrationForm.css';

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:5003/register', { email, password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5003/login', { email, password });
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      setMessage("Logged in successfully");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setMessage("Logged out successfully");
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={
            <LoginForm 
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              handleLogin={handleLogin}
              message={message} 
            />
          } />
          <Route path="/register" element={
            <RegistrationForm 
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              handleRegister={handleRegister}
              message={message} 
            />
          } />
          <Route path="/dashboard" element={
            isAuthenticated ? 
              <Dashboard handleLogout={handleLogout} /> : 
              <Navigate to="/login" />
          } />
          <Route path="/profile" element={
            isAuthenticated ? 
              <Profile /> : 
              <Navigate to="/login" />
          } />
          <Route path="/goals" element={
            isAuthenticated ? 
              <Goals /> : 
              <Navigate to="/login" />
          } />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
