import React from 'react'
import FarCaster from '../assets/farcasterframe.png'
import { FaStar } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';



const LearnMore = () => {
  return (
    <> 
    <Navbar />   
    <section id='learnmore' className='rounded-div mt-7'>
    <div className='rounded-xl bg-button text-btnText'>
      <h1 className='bold text-3xl p-5'>
      Learn More About Cryptocurrency With CoinGecko
      </h1>
      <p className='p-5 text-btnText text-xl'>
      Start with beginner friendly guides and the basics of cryptocurrency. 
      <br />Progress at your own pace and learn everything you need to know around it.
      </p>
      </div>

      <div className='rounded-divstock mt-7 py-4'>
        <h1 className='bold text-3xl'>
          Featured Articles
        </h1>
        <div>
          <img src={FarCaster}  className='xl:w-[950px] lg:w-[800px] md:w-[700px] sm:w-[600px] max-sm:w-[450px] rounded-xl m-4'/>
          <p className='bold text-gray-600 p-4 ml-1'>API</p>
          <h3 className='bold text-2xl p-4 ml-1'>Farcaster Frame Ecample & Tutorial: 
            <br />How to Build Your Own Farcaster Frame</h3>

            <span className='text-gray-500 ml-5'>In today's guide, we examine how to build a Farcaster Frame </span> <br />
              <span className='text-gray-500 ml-5'> using CoinGecko API and Next JS, focusing on trending pools data.</span>
              <div className='rating mt-5'>
                <h3 className='ml-5 flex items-center bold text-gray-500'>Rollend Xavier</h3>
                <span className='ml-5 flex items-center text-gray-500'>May 10, 2024 . </span>
                <span className='ml-5 flex items-center'><FaStar className='text-yellow-500 mr-2' /> 5.0 (3 votes)</span>
              </div>



            <div className='my-9'>
          <Link to="https://www.coingecko.com/learn/farcaster-frame-tutorial" target='_blank'
          className='p-4 ml-5 bg-button text-btnText bold rounded-3xl w-[125px] cursor-pointer 
           hover:shadow-3xl hover:border-accent hover:bg-transparent hover:text-accent duration-300 ease-in-out'>

            <span>
            Learn More
            </span>
          </Link>
          </div>



        </div>

      </div>
    </section>

    <Footer />
    </>
  )
}

export default LearnMore