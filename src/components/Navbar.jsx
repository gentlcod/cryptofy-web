import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import {UserAuth} from '../context/AuthContext'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const {user, logout} = UserAuth()
  const navigate = useNavigate()
  const [isSticky, setIsSticky] = useState(false);

  

  const handleMenuItemClick = () => {
    setIsMenuOpen(false); // Close menu icon
    setNavOpen(false); // Close mobile menu
  };

  const handleNav = () => {
    setNavOpen(!navOpen);
  };

  

  useEffect(() => {
    const handleScroll = () => {
      const isTop = window.scrollY < 10;
      if (!isTop) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div
      className={`rounded-divnavbar flex items-center justify-between h-20 font-bold ${
        isSticky ? 'sticky top-0 shadow-xl bg-white z-10' : ''
      }`}
    >
      <Link to='/' onClick={handleMenuItemClick} className='flex items-center'>
      <img
          src='/logowithoutbg.png'
          alt='logo'
          height={75}
          width={75}
         
        />
        <span className='text-accent font-bold uppercase ml-[-15px] text-4xl'>fy</span>
      </Link>


      <div className='hidden md:block'>
        <ThemeToggle />
      </div>

      {user?.email 
      ? (
        <div className='hidden md:block'>
          <Link to='/account'
          className='p-4'>
          Account
          </Link>

          <button 
          onClick={handleSignOut}>
            Sign Out
            </button>
        </div>
      ) : (
        <div className='hidden md:block'>
        <Link
          to='/signin'
          className='p-4 hover:text-accent 
          ease-in duration-300'
        >
          Sign In
        </Link>

        <Link
          to='/signup'
          className='bg-button text-btnText 
          px-5 py-2 ml-2 rounded-2xl shadow-lg 
          hover:shadow-2xl ease-in duration-300'
        >
          Sign Up
        </Link>
      </div>
      ) }

      {/* Menu Icon */}

      <div onClick={handleNav} className='block md:hidden cursor-pointer'>
        {navOpen ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Menu  */}

      <div
        className={`${
          navOpen
            ? 'md:hidden fixed left-0 top-20 flex flex-col items-center justify-between w-full h-[90%] bg-primary ease-in duration-300 z-10'
            : 'fixed left-[-100%] top-20 h-[90%] flex flex-col items-center justify-between ease-in duration-300'
        }`}
      >
        <ul className='w-full p-4'>
          <li className='border-b border-gray-400 py-6'>
            <Link to='/' onClick={handleMenuItemClick}>
              Home
              </Link>
          </li>


          <li className='border-b border-gray-400 py-6'>
            <Link to='/trending' onClick={handleMenuItemClick}>
              Trending
              </Link>
          </li>


          <li className='border-b border-gray-400 py-6'>
            <Link to='/explore' onClick={handleMenuItemClick}>
              Explore
              </Link>
          </li>

          <li className='border-b border-gray-400 py-6'>
            <Link to='/learnmore' onClick={handleMenuItemClick}>
              Learn
              </Link>
          </li>

          <li>
            <ThemeToggle />
          </li>
        </ul>





        {user?.email 
      ? (
        <div className='flex flex-col w-full p-4'>
          <Link to='/account' onClick={handleMenuItemClick}>
          <button className='w-full my-2 p-3 border bg-primary text-primary border-secondary rounded-2xl shadow-xl hover:border-accent hover:text-accent ease-in duration-300'>
              Account
            </button>
          </Link>
          

          <button 
            onClick={handleSignOut}
            className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl hover:shadow-2xl ease-in duration-300'>
            Sign Out
          </button>


        </div>
      ) : (
        <div className='flex flex-col w-full p-4'>
          <Link to='/signin' onClick={handleMenuItemClick}>
            <button className='w-full my-2 p-3 border bg-primary text-primary border-secondary rounded-2xl shadow-xl hover:border-accent hover:text-accent ease-in duration-300'>
              Sign In
            </button>
          </Link>

          <Link to='/signup' onClick={handleMenuItemClick}>
            <button className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl hover:shadow-2xl ease-in duration-300'>
              Sign Up
            </button>
          </Link>
        </div>
      )}
      </div>
    </div>
  );
};

export default Navbar;
