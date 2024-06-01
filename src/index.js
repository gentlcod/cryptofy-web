import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const Preloader = () => {
  useEffect(() => {
    // After 2 seconds, hide the preloader
    const timeout = setTimeout(() => {
      const preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.style.display = 'none';
      }
    }, 2000); // 2000 milliseconds = 2 seconds

    // Clean up the timeout on component unmount
    return () => clearTimeout(timeout);
  }, []);

  return <div id="preloader"></div>;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
