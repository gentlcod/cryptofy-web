// components/CoinItem.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { UserAuth } from '../context/AuthContext';
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { db } from '../firebase';
import { arrayUnion, arrayRemove, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';

const CoinItem = ({ coin }) => {
  const { user } = UserAuth();
  const [savedCoin, setSavedCoin] = useState(false);

  useEffect(() => {
    const checkSavedCoin = async () => {
      if (user?.uid) {
        const coinDoc = await getDoc(doc(db, 'users', user.uid));
        if (coinDoc.exists()) {
          const watchList = coinDoc.data().watchList || [];
          const isSaved = watchList.some(savedCoin => savedCoin.id === coin.id);
          setSavedCoin(isSaved);
        }
      }
    };
    checkSavedCoin();
  }, [user?.uid, coin.id]);

  const coinPath = doc(db, 'users', `${user?.uid}`);

  const saveCoin = async () => {
    if (user?.uid) {
      const coinData = {
        id: coin.id,
        name: coin.name,
        image: coin.image,
        rank: coin.market_cap_rank,
        symbol: coin.symbol
      };
      try {
        const docSnap = await getDoc(coinPath);
        if (docSnap.exists()) {
          if (savedCoin) {
            // Remove coin from the watch list
            setSavedCoin(false);
            await updateDoc(coinPath, {
              watchList: arrayRemove(coinData)
            });
          } else {
            // Add coin to the watch list
            setSavedCoin(true);
            await updateDoc(coinPath, {
              watchList: arrayUnion(coinData)
            });
          }
        } else {
          // Document does not exist, create it
          await setDoc(coinPath, {
            watchList: [coinData]
          });
          setSavedCoin(true);
        }
      } catch (error) {
        console.error("Error updating document: ", error);
      }
    } else {
      alert('Please sign in to save a coin to your watch list');
    }
  };

  return (
    <tr className='h-[80px] border-b overflow-hidden'>
      <td onClick={saveCoin} className='cursor-pointer'>
        {savedCoin ? <AiFillStar /> : <AiOutlineStar />}
      </td>
      <td>{coin.market_cap_rank}</td>
      <td>
        <Link to={`/coin/${coin.id}`}>
          <div className='flex items-center'>
            <img className='w-6 mr-2 rounded-full' src={coin.image} alt={coin.id} />
            <p className='hidden sm:table-cell'>{coin.name}</p>
          </div>
        </Link>
      </td>
      <td>{coin.symbol.toUpperCase()}</td>
      <td>${coin.current_price.toLocaleString()}</td>
      <td>
        {coin.price_change_percentage_24h > 0
          ? (<p className='text-green-600'>{coin.price_change_percentage_24h.toFixed(2)}%</p>)
          : (<p className='text-red-600'>{coin.price_change_percentage_24h.toFixed(2)}%</p>)}
      </td>
      <td className='w-[180px] hidden md:table-cell'>${coin.total_volume.toLocaleString()}</td>
      <td className='w-[180px] hidden md:table-cell'>${coin.market_cap.toLocaleString()}</td>
      <td>
        {coin.sparkline_in_7d && coin.sparkline_in_7d.price ? (
          <Sparklines data={coin.sparkline_in_7d.price}>
            <SparklinesLine color='teal' />
          </Sparklines>
        ) : <p>No data available</p>}
      </td>
    </tr>
  );
};

export default CoinItem;
