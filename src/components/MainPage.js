import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Link, animateScroll as scroll } from 'react-scroll';
import { UserAuth } from '../context/AuthContext';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { FiArrowUpRight, FiArrowDownRight } from 'react-icons/fi';
import ThemeToggle from './ThemeToggle';
import Crypto from '../assets/hero-img.png';
import BTC from '../assets/btc-img.png';
import Trade from '../assets/trade.png';
import axios from 'axios';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaReddit } from 'react-icons/fa';


const MainPage = () => {
  const [data, setData] = useState(null);
  const [navOpen, setNavOpen] = useState(false);
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const [shadow, setShadow] = useState(false);
  const [activeNavLink, setActiveNavLink] = useState('');
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';


  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // console.log(data)
  

  const isElementInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    const verticalVisible = rect.top <= windowHeight && rect.bottom >= 0;
    const horizontalVisible = rect.left <= windowWidth && rect.right >= 0;

    return verticalVisible && horizontalVisible;
  };

  const handleScroll = () => {
    const sections = document.querySelectorAll("section");
    let activeSection = 'home'; // Default to home

    sections.forEach((section) => {
      if (isElementInViewport(section)) {
        activeSection = section.id;
      }
    });

    setActiveNavLink(activeSection);

    const isTop = window.scrollY < 10;
    setIsSticky(!isTop);
    setShadow(window.scrollY >= 90);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleMenuItemClick = (path) => {
    setNavOpen(false); // Close mobile menu
    setActiveNavLink(path);
  };

  const handleNav = () => {
    setNavOpen(!navOpen);
  };

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  if (!data) return null;


  return (
    <>
      {/* Navbar */}
      <div
        className={`rounded-divnav flex items-center justify-between h-20 font-bold ${shadow ? 'shadow-lg' : ''} ${isSticky ? 'sticky top-0 bg-white z-10' : ''}`}
      >
        <a href='/' onClick={() => handleMenuItemClick('home')}>
          <p className='xl:pl-[145px]'>
            <span className='text-5xl text-accent'>C</span>
            <span className='text-accent text-4xl'>fy</span>
          </p>
        </a>

        <ul className='flex items-center justify-between'>
          <li>
            <Link
              to="home"
              smooth={true}
              duration={100}
              className='nav-link hidden lg:block lg:px-[90px] cursor-pointer hover:text-accent ease-in duration-300'
              onClick={() => handleMenuItemClick('home')}
            >
              Home

       
            </Link>
           
          </li>
          <li>
            <Link
              to="explore"
              smooth={true}
              duration={100}
              className='nav-link hidden lg:block lg:px-[90px] cursor-pointer hover:text-accent ease-in duration-300'
              onClick={() => handleMenuItemClick('explore')}
            >
              Explore
            </Link>
          </li>
          <li>
            <Link
              to="contact"
              smooth={true}
              duration={100}
              className='nav-link hidden lg:block lg:px-[90px] cursor-pointer hover:text-accent ease-in duration-300'
              onClick={() => handleMenuItemClick('contact')}
            >
              Contact
            </Link>
          </li>
        </ul>

        <div className='hidden lg:block'>
          <ThemeToggle />
        </div>

        {user?.email ? (
          <div className='hidden lg:block xl:mr-[150px]'>
            <button onClick={() => navigate('/account')}
             className='pr-12 hover:text-accent ease-in duration-300'>
              Account
            </button>

            <button onClick={handleSignOut}
            className='hover:text-accent ease-in duration-300'>
              Sign Out
            </button>
          </div>
        ) : (
          <div className='hidden lg:block xl:mr-[150px]'>
            <button
              className={`p-4 ${activeNavLink === 'signin' ? 'text-accent' : 'hover:text-accent'} ease-in duration-300 cursor-pointer`}
              onClick={() => {
                navigate('/signin');
                handleMenuItemClick('signin');
              }}
            >
              Sign In
            </button>
            <button
              className={`bg-button text-btnText cursor-pointer px-5 py-2 ml-2 rounded-2xl shadow-lg ${activeNavLink === 'signup' ? 'text-accent' : 'hover:shadow-2xl'} ease-in duration-300`}
              onClick={() => {
                navigate('/signup');
                handleMenuItemClick('signup');
              }}
            >
              Sign Up
            </button>
          </div>
        )}

        {/* MENU ICON */}
        <div onClick={handleNav} className='block lg:hidden cursor-pointer'>
          {navOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>

        <div
          className={`${navOpen ? 'lg:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[93%] bg-primary ease-in duration-300 z-10' : 'fixed left-[-100%] top-20 h-[93%] flex flex-col items-center justify-between ease-in duration-300'}`}
        >
          <ul className='w-full p-4'>
            <li className='border-b border-gray-400 py-6'>
              <Link
                to='home'
                smooth={true}
                duration={100}
                className={`nav-link hover:text-accent lg:px-[90px] cursor-pointer ${activeNavLink === 'home' ? 'text-accent' : 'hover:text-accent'}`}
                onClick={() => handleMenuItemClick('home')}
              >
                Home
              </Link>
            </li>
            <li className='border-b border-gray-400 py-6'>
              <Link
                to="explore"
                smooth={true}
                duration={100}
                className={`nav-link hover:text-accent lg:px-[90px] cursor-pointer ${activeNavLink === 'explore' ? 'text-accent' : 'hover:text-accent'}`}
                onClick={() => handleMenuItemClick('explore')}
              >
                Explore
              </Link>
            </li>
            <li className='border-b border-gray-400 py-6'>
              <Link
                to="contact"
                smooth={true}
                duration={100}
                className={`nav-link hover:text-accent lg:px-[90px] cursor-pointer ${activeNavLink === 'contact' ? 'text-accent' : 'hover:text-accent'}`}
                onClick={() => handleMenuItemClick('contact')}
              >
                Contact
              </Link>
            </li>
            <li>
              <ThemeToggle />
            </li>
          </ul>



          {user?.email ? (
          <div className='flex flex-col w-full p-4'>
            <button onClick={() => navigate('/account')}
              className='w-full my-2 p-3 border bg-primary text-primary border-secondary rounded-2xl shadow-xl hover:border-accent hover:text-accent ease-in duration-300'>
              Account
            </button>

            <button onClick={handleSignOut}
              className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl hover:shadow-2xl ease-in duration-300'>
              Sign Out
            </button>
          </div>
        ) : (

          <div className='flex flex-col w-full p-4'>
            <button
              className='w-full my-2 p-3 border bg-primary text-primary border-secondary rounded-2xl shadow-xl hover:border-accent hover:text-accent ease-in duration-300'
              onClick={() => {
                navigate('/signin');
                handleMenuItemClick('signin');
              }}
            >
              Sign In
            </button>

            <button
              className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl hover:shadow-2xl ease-in duration-300'
              onClick={() => {
                navigate('/signup');
                handleMenuItemClick('signup');
              }}
            >
              Sign Up
            </button>
          </div>
        )}
        </div>
      </div>
    


 {/* Hero */}
<section id='home' className='rounded-div'>
  <div className='hero'>
    <div className='container'>
      {/* LEFT SIDE */}
      <div  className='left text-[25px]'>
        <p className=' text-[45px] font-bold uppercase'>
          Buy & Sell Crypto 24/7 using your retirement account
        </p> <br />
        <p className='small-text'>
          Invest in Cryptocurrency with 
          <br /> your IRA Buy, Sell and store
          <br /> hundreds of Cryptocurrencies
        </p> <br />
        <div className='learnmore-container '>
        <button   
            className='btn text-accent bg-transparent border cursor-pointer lmore'
            onClick={() => navigate('/learnmore')}
            >  
            Learn More
        </button>
          <div className='btn-group'>

          <button 
          className='btn bg-button text-btnText px-5 py-2 ml-2 ease-in duration-300'
          onClick={() => navigate('/trending')}
          >
          Trending Coins
          </button>

            
          </div>
        </div>
      </div>
      {/* RIGHT SIDE */}
      <div className='right'>
        <div className='img-container'>
          <img src={Crypto} alt='' />
        </div>
      </div>
    </div>
  </div>
</section>














{/* Explore  */}
<section id='explore' className='rounded-div pt-[99px]'>
  <div className='container'>
    <div className='left text-[25px]'>
      <h2 className='text-[41px] font-bold uppercase'>
        Explore Crypto's  
        <br/> Like Bitcoin, Ethereum  
        <br/>And Dogecoin
      </h2>
      <p>
        See all available assets:
        <br /> Cryptocurrencies and NFT's
      </p>
      <button 
      className='btn bg-button text-btnText 
      px-5 py-2 ease-in duration-300'
      onClick={() => navigate('/explore')}
      >
        Explore Coins
      </button>
    </div>

    <div className='right'>
       <div className='card'>
      <div className='top'>
   

        <img src={data[0].image}/>
      </div>
      <div>
        <h5>{data[0].name}</h5>
        <p>${data[0].current_price.toLocaleString()}</p>
      </div>

      {data[0].price_change_percentage_24h !== undefined && (
            data[0].price_change_percentage_24h < 0 ? (
              <span className='red'>
                <FiArrowDownRight />
                {data[0].price_change_percentage_24h.toFixed(2)}%
              </span>
            ) : (
              <span className='green'>
                <FiArrowUpRight />
                {data[0].price_change_percentage_24h.toFixed(2)}%
              </span>
            )
          )}
    </div>


    <div className='card'>
      <div className='top'>
        <img 
          src={data[1].image}
        />     
      </div>
      <div>
        <h5>{data[1].name}</h5>
        <p>${data[1].current_price.toLocaleString()}</p>
      </div>
      {data[1].price_change_percentage_24h !== undefined && (
            data[1].price_change_percentage_24h < 0 ? (
              <span className='red'>
                <FiArrowDownRight />
                {data[1].price_change_percentage_24h.toFixed(2)}%
              </span>
            ) : (
              <span className='green'>
                <FiArrowUpRight />
                {data[1].price_change_percentage_24h.toFixed(2)}%
              </span>
            )
          )}
    </div>

    <div className='card'>
      <div className='top'>
        <img 
          src={data[2].image}
       
        />     
      </div>
      <div>
        <h5>{data[2].name}</h5>
        <p>${data[2].current_price.toLocaleString()}</p>
      </div>
      {data[2].price_change_percentage_24h !== undefined && (
            data[2].price_change_percentage_24h < 0 ? (
              <span className='red'>
                <FiArrowDownRight />
                {data[2].price_change_percentage_24h.toFixed(2)}%
              </span>
            ) : (
              <span className='green'>
                <FiArrowUpRight />
                {data[2].price_change_percentage_24h.toFixed(2)}%
              </span>
            )
          )}
    </div>


    <div className='card'>
      <div className='top'>
        <img 
          src={data[3].image}
        
        />     
      </div>
      <div>
        <h5>{data[3].name}</h5>
        <p>${data[3].current_price.toLocaleString()}</p>
      </div>
      {data[3].price_change_percentage_24h !== undefined && (
            data[3].price_change_percentage_24h < 0 ? (
              <span className='red'>
                <FiArrowDownRight />
                {data[3].price_change_percentage_24h.toFixed(2)}%
              </span>
            ) : (
              <span className='green'>
                <FiArrowUpRight />
                {data[3].price_change_percentage_24h.toFixed(2)}%
              </span>
            )
          )}
    </div>


    <div className='card'>
      <div className='top'>
        <img 
          src={data[4].image}
          
        />     
      </div>
      <div>
        <h5>{data[4].name}</h5>
        <p>${data[4].current_price.toLocaleString()}</p>
      </div>
      {data[4].price_change_percentage_24h !== undefined && (
            data[4].price_change_percentage_24h < 0 ? (
              <span className='red'>
                <FiArrowDownRight />
                {data[4].price_change_percentage_24h.toFixed(2)}%
              </span>
            ) : (
              <span className='green'>
                <FiArrowUpRight />
                {data[4].price_change_percentage_24h.toFixed(2)}%
              </span>
            )
          )}
    </div>


    <div className='card'>
      <div className='top'>
        <img 
          src={data[6].image}          
        />     
      </div>
      <div>
        <h5>{data[6].name}</h5>
        <p>${data[6].current_price.toLocaleString()}</p>
      </div>
      {data[6].price_change_percentage_24h !== undefined && (
            data[6].price_change_percentage_24h < 0 ? (
              <span className='red'>
                <FiArrowDownRight />
                {data[6].price_change_percentage_24h.toFixed(2)}%
              </span>
            ) : (
              <span className='green'>
                <FiArrowUpRight />
                {data[6].price_change_percentage_24h.toFixed(2)}%
              </span>
            )
          )}
    </div>

    </div>
  </div>
</section>








    {/* Contact  */}

    <section id='contact' className='rounded-div'>
        <div className='container'>

            {/* LEFT  */}

            <div className='left'>
                <img 
                src={Trade} 
               
                alt='/'
                />

            </div>

            {/* RIGHT  */}

            <div className='right text-[17px]'>
             
               
                <h2 className='mb-6 text-[31px] font-bold uppercase'>Earn passive income with 
                 <br /> crypto  and Earn up  
                  to 12% annual rewards on 
                  <br /> 30+ digital assets
                    </h2>
                <h5 className='mb-6'>Contact us for more info</h5>
                <div className='input-container'>
                <input type='text' className='name' placeholder='Enter your name' />
                    <input className='email' type='email' placeholder='Enter your email' />
                    <textarea rows={7} cols={50} placeholder='Enter your query'></textarea>
                    <button className='btn bg-button text-btnText px-5 py-2 ml-2'>Send Message</button>

                </div>
            </div>

        </div>
    </section>



     <div className='border-t border-accent'></div>



    {/* FOOTER  */}


    <section id='footer' className='rounded-divfooter'>
      <div className='footer'>
        <div className='container'>
          <div className='col col-1'>
          <Link 
               to="home"
               smooth={true}
               duration={100}
               onClick={() => handleMenuItemClick('/home')}
               className='bold cursor-pointer'>
          <p>
            <span className='bold-2 text-5xl uppercase text-accent'>C</span>
            <span className='bold-2 text-accent lowercase text-5xl'>fy</span>
          </p>
        </Link>
          </div>

          <div className='col'>
            <h5 className='bold border-b w-[70px] border-accent'>Support</h5>
            <span className='bar flex flex-col'>
              <a href='https://t.me/coingecko' target='_blank' rel="noopener noreferrer">Chat</a>
              <a href='https://support.coingecko.com/hc/en-us' target='_blank' rel="noopener noreferrer">Help</a>
              <a href='https://www.coingecko.com/en/faq' target='_blank' rel="noopener noreferrer">FAQs</a>
            </span>
          </div>



          <div className='col'>
            <h5 className='bold border-b w-[95px] border-accent'>Developers</h5>
            <span className='bar flex flex-col'>
              <a href='https://www.coingecko.com/en/news' target='_blank' rel="noopener noreferrer">News</a>
              <a href='https://www.coingecko.com/en/cryptocurrency-heatmap' target='_blank' rel="noopener noreferrer">Heatmaps</a>
              <a href='https://www.coingecko.com/en/api' target='_blank' rel="noopener noreferrer">API</a>
            </span>
          </div>


          <div className='col'>
            <h5 className='bold border-b w-[85px] border-accent'>Company</h5>
            <span className='bar flex flex-col'>
              <a href='https://www.coingecko.com/en/about' target='_blank' rel="noopener noreferrer">About</a>
              <a href='https://blog.coingecko.com/' target='_blank' rel="noopener noreferrer">Blog</a>
              <a href='https://careers.coingecko.com/' target='_blank' rel="noopener noreferrer">Careers</a>
              <a href='https://www.coingecko.com/en/privacy' target='_blank' rel="noopener noreferrer">Privacy</a>
            </span>
          </div>


          <div className='col'>
            <h5 className='bold border-b w-[57px] border-accent'>Social</h5>
            <span className='bar flex flex-col'>
              <a href='https://www.facebook.com/coingecko' target='_blank' rel="noopener noreferrer"><FaFacebook className='text-accent mb-2 ml-4'/></a>
              <a href='https://twitter.com/coingecko' target='_blank' rel="noopener noreferrer"><FaTwitter className='text-accent mb-2 ml-4'/></a>
              <a href='https://www.linkedin.com/company/coingecko/' target='_blank' rel="noopener noreferrer"><FaLinkedin className='text-accent mb-2 ml-4' /></a>
              <a href='https://www.instagram.com/coingecko/' target='_blank' rel="noopener noreferrer"><FaInstagram className='text-accent mb-2 ml-4' /></a>
              <a href="https://www.reddit.com/r/coingecko/" target='_blank' rel="noopener noreferrer"><FaReddit className='text-accent mb-2 ml-4'/></a>
            </span>
          </div>


          <div className='col'>
            <h5 className='bold border-b w-[57px] border-accent'>Theme</h5>
            <span className='bar flex flex-col'>
              <div className='ml-5 w-full'>
             <ThemeToggle />
             </div>
            </span>
          </div>

   

        </div>

       

      </div>

      <div className='copyright text-center justify-center border-accent my-5'>
            <p>Powered By Coingecko</p>
            <p>&copy;2024 Cryptofy All Rights Reserved </p>
          </div>
    </section>


        </>
    );
}

export default MainPage;
