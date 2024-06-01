import React, {useEffect, useState} from 'react';
import CoinSearch from '../components/CoinSearch';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Explore = ({ coins }) => {
  // console.log(coins); 
  // This should log the coins passed from App

  const [displayCount, setDisplayCount] = useState(20);


  const handleShowMore = () => {
    setDisplayCount(displayCount + 10); // Show 10 more coins each time the button is clicked
  };


  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  }, []);



  return (
    <>
      <Navbar />
      <CoinSearch coins={coins.slice(0, displayCount)} />
      {displayCount < coins.length && (
        <div className="text-center my-4">
          <button 
    className='bold p-4 hover:text-accent 
                    ease-in duration-300'
            onClick={handleShowMore}
          >
            View More
          </button>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Explore;
