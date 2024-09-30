import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Make sure BrowserRouter is imported
import App from './App';

// Rendering the App component to the root DOM element
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Wrap your App in BrowserRouter */}
      <App />
    
  </React.StrictMode>
);
