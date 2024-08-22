// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'; // Global styles
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Optional: reportWebVitals can be used for analytics or performance tracking
reportWebVitals();
