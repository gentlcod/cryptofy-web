// SavedCoin.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose } from 'react-icons/ai';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { UserAuth } from '../context/AuthContext';

const SavedCoin = () => {
  const [coins, setCoins] = useState([]);
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.uid) {
      const unsubscribe = onSnapshot(doc(db, 'users', user.uid), (doc) => {
        if (doc.exists()) {
          const watchList = doc.data()?.watchList || [];
          setCoins(watchList);
          console.log("WatchList: ", watchList); // Log watchList to verify data retrieval
        } else {
          console.log("No such document!");
          setCoins([]); // Set an empty array if document doesn't exist
        }
        setLoading(false);
      }, (error) => {
        console.error("Error fetching document: ", error);
        setLoading(false);
      });
  
      return () => unsubscribe();
    }
  }, [user?.uid]);

  const deleteCoin = async (passedId) => {
    try {
      const updatedCoins = coins.filter((item) => item.id !== passedId);
      setCoins(updatedCoins);

      await updateDoc(doc(db, 'users', user.uid), {
        watchList: updatedCoins
      });
    } catch (error) {
      console.error('Error deleting coin: ', error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {coins.length === 0 ? (
        <p>
          You don't have any coins saved.
          Please save a coin to add it to the watch list.
          <br />
          <Link to='/explore' className='hover:text-accent bold ease-in duration-300'>Click here to explore coins</Link>
        </p>
      ) : (
        <table className='w-full border-collapse text-center'>
          <thead>
            <tr>
              <th className='px-4'>Rank #</th>
              <th className='text-left'>Coin</th>
              <th className='text-left'>Remove</th>
            </tr>
          </thead>
          <tbody>
            {coins.map((coin) => (
              <tr key={coin.id} className='h-[60px] overflow-hidden'>
                <td>{coin.rank}</td>
                <td>
                  <Link to={`/coin/${coin.id}`}>
                    <div className='flex items-center'>
                      <img src={coin.image} className='w-8 mr-4' alt={coin.name} />
                      <div>
                        <p className='hidden sm:table-cell'>{coin.name}</p>
                        <p className='text-gray-500 text-left text-sm'>{coin.symbol.toUpperCase()}</p>
                      </div>
                    </div>
                  </Link>
                </td>
                <td className='pl-8'>
                  <AiOutlineClose onClick={() => deleteCoin(coin.id)} className='cursor-pointer' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCoin;
