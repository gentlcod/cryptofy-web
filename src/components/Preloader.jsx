import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    setLoading(true); // Display the preloader whenever location changes
    return () => clearTimeout(timeout);
  }, [location.pathname]); // Re-run effect whenever location pathname changes



  return loading ? <div id="preloader"></div> : null;
};

export default Preloader;
