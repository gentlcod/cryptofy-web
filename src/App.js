// App.js
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import SignUp from './routes/SignUp';
import SignIn from './routes/SignIn';
import Account from './routes/Account';
import CoinPage from './routes/CoinPage';
import axios from 'axios';
import { AuthProvider } from './context/AuthContext';
import MainPage from './components/MainPage';
import Trending from './routes/Trending';
import Preloader from './components/Preloader';
import LearnMore from './routes/LearnMore';
import Explore from './routes/Explore';
import PrivacyPolicy from './routes/PrivacyPolicy';
import DataDeletion from './routes/DataDeletion';

function App() {
  const [coins, setCoins] = useState([]);
  
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true';

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoins(response.data);
      // console.log(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <ThemeProvider>
      <AuthProvider>
        <Preloader />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/explore" element={<Explore coins={coins} />} />
          <Route path="/learnmore" element={<LearnMore />} />
          <Route path="/trending" element={<Trending coins={coins} />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<Account />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/data-deletion" element={<DataDeletion />} />
          <Route path="/coin/:coinId" element={<CoinPage />} />
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
