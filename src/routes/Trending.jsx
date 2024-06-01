import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Trending = () => {
    const [trending, setTrending] = useState([]);
    const [showMore, setShowMore] = useState(false);

    const trendingUrl = 'https://api.coingecko.com/api/v3/search/trending';
    const marketsUrl = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false';

    useEffect(() => {
        const fetchTrendingData = async () => {
            try {
                const trendingResponse = await axios.get(trendingUrl);
                const trendingData = trendingResponse.data.coins.map(coin => ({
                    id: coin.item.id,
                    name: coin.item.name,
                    symbol: coin.item.symbol,
                    image: coin.item.small,
                    price: coin.item.price_btc // Note that this is in BTC, not USD
                }));

                const marketsResponse = await axios.get(marketsUrl);
                const marketsData = marketsResponse.data.map(coin => ({
                    id: coin.id,
                    name: coin.name,
                    symbol: coin.symbol,
                    image: coin.image,
                    price: coin.current_price
                }));

                // Merging both datasets, you might need to avoid duplications based on the ID
                const combinedData = [...trendingData, ...marketsData.slice(0, 40)];

                setTrending(combinedData);
            } catch (error) {
                console.error('Error fetching trending data:', error);
            }
        };

        fetchTrendingData();
    }, []);

    const handleShowMore = () => {
        setShowMore(!showMore);
    };

    return (
        <>
            <Navbar />
            <section id='trending'>

                <div className='rounded-divstock my-7 py-8 text-primary'>
                    <h1 className='text-2xl font-bold'>Trending Coins</h1>

                    <div className='py-7'>

                    <Link to='/explore'
                    className='bold p-4 hover:text-accent 
                    ease-in duration-300'
                   >
                    Explore Crypto's
                    </Link>
                    </div>


                    <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {trending.slice(0, showMore ? trending.length : 10).map((coin, idx) => (
                            <div key={idx} className='flex justify-between p-4 hover:scale-105 ease-in-out duration-300'>
                                <div className='flex w-full items-center justify-between'>
                                    <div className='flex'>
                                        <img className='mr-4 rounded-full w-10 h-10' src={coin.image} alt="" />
                                        <div>
                                            <p className='font-bold'>{coin.name}</p>
                                            <p>{coin.symbol}</p>
                                        </div>
                                    </div>
                                    <div className='flex items-center'>
                                        <img
                                            src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
                                            alt=""
                                            className='w-4 mr-2'
                                        />
                                        <p>{coin.price ? coin.price.toFixed(7) : 'N/A'}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {trending.length > 10 && (
                        <div className='flex justify-center'>
                            <button
                                 className='bold p-4 hover:text-accent 
                                 ease-in duration-300'
                                onClick={handleShowMore}
                            >
                                {showMore ? 'Show Less' : 'Show More'}
                            </button>
                        </div>
                    )}
                </div>
            </section>
            <Footer />
        </>
    );
};

export default Trending;
