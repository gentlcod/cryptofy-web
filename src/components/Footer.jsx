import React from 'react'
import { AiOutlineInstagram } from 'react-icons/ai'
import { FaFacebookF, FaTwitter, FaLinkedin, FaReddit } from 'react-icons/fa'
import ThemeToggle from './ThemeToggle'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='rounded-divfooter mt-8 pt-8 text-primary'>
        <div className='grid md:grid-cols-2'>
            <div className='flex justify-evenly w-full 
            md:max-w-[300px] upercase'>
                <div>
                    <h2 className='font-bold mb-7'>Support</h2>
                    <ul>
                       <a href='https://support.coingecko.com/hc/en-us' target='_blank' rel="noopener noreferrer"><li className='text-sm py-2'>Help Center</li></a>
                       <a href="https://www.coingecko.com/en/api" target='_blank' rel="noopener noreferrer"> <li className='text-sm py-2'>API Status</li></a>
                       <a href="https://docs.coingecko.com/reference/introduction" target='_blank' rel="noopener noreferrer"> <li className='text-sm py-2'>Documentation</li></a>
                    </ul>
                </div>
                <div className='ml-12'>
                    <h2 className='font-bold mb-7'>Info</h2>
                    <ul>
                       <a href="https://www.coingecko.com/en/about" target='_blank'><li className='text-sm  py-2'>About Us</li></a>
                       <a href="https://www.coingecko.com/learn/5-things-to-invest-in-during-the-downturn" target='_blank'><li className='text-sm py-2'>Invest</li></a>
                       <a href="https://www.coingecko.com/research/publications/crypto-legal-countries" target='_blank'><li className='text-sm py-2'>Legal</li></a>
                    </ul>
                </div>
            </div>
             {/* RIGHT TEXT */}
            <div className='lg:ml-[13rem]'>
                <div className='w-full justify-end'>
                    <div className='w-full md:max-w-[300px] py-4 relative'>
                        <div className='flex justify-center md:justify-end py-4 
                        md:py-0 md:pb-4 mt-[-1rem]'>
                            <ThemeToggle />
                         </div>
                         <p className='text-center md:text-right'>Sign up for crypto news</p>
                         <div className='py-4'>
                            <form>
                                <input className='bg-primary border mr-2 border-input p-2 w-full
                                shadow-xl rounded-2xl md:w-auto'
                                 type="email" placeholder='Enter Your Email' />
                                 
                                <Link to='/signup'
                                className='bg-button text-btnText cursor-pointer
                                p-2 px-4 w-full rounded-2xl shadow-xl mt-7
                                hover:shadow-2xl md:w-auto my-2'>
                                    Sign Up</Link>
                            </form>
                         </div>
                         <div className='flex py-4 justify-between text-accent'>
                       <a href='https://twitter.com/coingecko' target='_blank' rel="noopener noreferrer">  <FaTwitter /> </a>
                       <a href="https://www.linkedin.com/company/coingecko/" target='_blank' rel="noopener noreferrer">  <FaLinkedin /> </a>
                       <a href='https://www.facebook.com/coingecko' target='_blank' rel="noopener noreferrer">  <FaFacebookF /> </a>
                       <a href="https://www.reddit.com/r/coingecko/" target='_blank' rel="noopener noreferrer"><FaReddit /></a>
                       <a href='https://www.instagram.com/coingecko/' target='_blank' rel="noopener noreferrer">  <AiOutlineInstagram/> </a>
                         </div>
                      </div>
                </div>
            </div>
        </div>
        <p className='text-center py-4'>
            Powered by Coin Gecko
        </p>
    </div>
  )
}

export default Footer