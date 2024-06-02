import React, { useEffect, useState } from 'react'
import { Sparklines, SparklinesLine } from 'react-sparklines'
import axios from 'axios'
import {FaTwitter, FaFacebook, FaReddit, FaLinkedin, FaArrowLeft} from 'react-icons/fa'
import DOMPurify from 'dompurify'
import { useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const CoinPage = () => {

  const [coin, setCoin] = useState({})
  const params = useParams() 

  const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&sparkline=true`;


  useEffect(() => {
    axios.get(url).then((response) => {
      setCoin(response.data)
      console.log(response.data)
    })
  }, [url])


  return (
    <>
    <Navbar />
         <a href="/explore" className='md:hidden'>
    <p className='rounded-div pt-9'><FaArrowLeft/>Back</p>
    </a>
    <div className='rounded-div my-7'>
      <div className='flex py-8'>
        <img className='w-20 mr-8' src={coin.image?.large} alt="/" />
        <div>
          <p className='text-3xl font-bold'>{coin?.name} price </p>
          <p>{coin.symbol?.toUpperCase()} / USD</p>
        </div>
      </div>

      <div className='grid md:grid-cols-2 gap-8'>
        <div>
          <div className='flex justify-between'>
            {coin.market_data?.current_price 
            ? (<p className='text-3xl font-bold'>{coin.market_data.current_price.usd.toLocaleString()}</p>)
            : null}
            <p>7 Days</p>
          </div>

          <div>
            <Sparklines data={coin.market_data?.sparkline_7d.price}>
              <SparklinesLine color='teal' />
            </Sparklines>
          </div>

          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm '>Market Cap</p>
              {coin.market_data?.market_cap 
              ? (<p>{coin.market_data.market_cap.usd.toLocaleString()}</p>) 
              : null}
            </div>

            <div>
              <p>Volume (24h)</p>
              {coin.market_data?.market_cap 
              ? (<p>{coin.market_data.total_volume.usd.toLocaleString()}</p>) 
              : null}
            </div>
          </div>

          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>24h High</p>
              {coin.market_data?.high_24h 
              ? (<p>{coin.market_data.high_24h.usd.toLocaleString()}</p>) 
              : null}
            </div>

            <div>
              <p className='text-gray-500 text-sm'>24h Low</p>
              {coin.market_data?.low_24h 
              ? (<p>{coin.market_data.low_24h.usd.toLocaleString()}</p>) 
              : null}
            </div>
          </div>
        </div>

        <div>
          <p className='text-xl font-bold'>
          Market Stats
          </p>
          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>
                Market Rank
                {coin.market_camp_rank}
              </p>
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Hashing Algorithm</p>
              {coin.hashing_algorithm 
              ? <p>{coin.hashing_algorithm}</p> 
              : null}
            </div>
            <div>
              <p className='text-gray-500 text-sm'>Trust Score</p>
              {coin.tickers 
              ? <p>{coin.liquidity_score}</p> 
              : null }
            </div>
          </div>

          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (24h)</p>
              {coin.market_data 
              ? (<p>{coin.market_data.price_change_percentage_24h}%</p>) 
              : null}
            </div>

            <div>
              <p className='text-gray-500 text-sm'>Price Change (7d)</p>
              {coin.market_data 
              ? (<p>{coin.market_data.price_change_percentage_7d}%</p>) 
              : null}
            </div>

            <div>
              <p className='text-gray-500 text-sm'>Price Change (14d)</p>
              {coin.market_data 
              ? (<p>{coin.market_data.price_change_percentage_14d}%</p>) 
              : null}
            </div>
          </div>

          <div className='flex justify-between py-4'>
            <div>
              <p className='text-gray-500 text-sm'>Price Change (30d)</p>
              {coin.market_data 
              ? (<p>{coin.market_data.price_change_percentage_30d}%</p>) 
              : null}
            </div>

            <div>
              <p className='text-gray-500 text-sm'>Price Change (60d)</p>
              {coin.market_data 
              ? (<p>{coin.market_data.price_change_percentage_60d}%</p>) 
              : null}
            </div>

            <div>
              <p className='text-gray-500 text-sm'>Price Change (1y)</p>
              {coin.market_data 
              ? (<p>{coin.market_data.price_change_percentage_1y }%</p>) 
              : null}
            </div>
          </div>

          <div className='flex justify-around p-8 text-accent'>
            <a href="https://twitter.com/coingecko" target='_blank' rel="noopener noreferrer"> <FaTwitter className='cursor-pointer' /></a>
            <a href="https://www.facebook.com/coingecko" target='_blank' rel="noopener noreferrer"><FaFacebook className='cursor-pointer'/></a>
            <a href="https://www.reddit.com/r/coingecko/" target='_blank' rel="noopener noreferrer"><FaReddit className='cursor-pointer'/></a>
            <a href="https://www.linkedin.com/company/coingecko/" target='_blank' rel="noopener noreferrer"><FaLinkedin className='cursor-pointer'/></a>
          </div>
        </div>
      </div>

      {/* DESCRIPTION */}
      {coin && coin.description && coin.description.en &&
  <div className='py-4'>
    <p className='text-xl font-bold'>
      About {coin.name}
    </p>
    <p>{coin.description.en}</p>
    <p 
    dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(coin.description 
      ? coin.description.en 
      : ''),}}>
        
      </p>
  </div>
}
    </div>
    <Footer />
    </>
  )
  
}


export default CoinPage