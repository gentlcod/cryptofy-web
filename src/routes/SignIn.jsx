import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { IoEye } from "react-icons/io5";
import { BiSolidHide } from "react-icons/bi";
import { UserAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaArrowLeft } from 'react-icons/fa';

const SignIn = ({ coins }) => {
  const { signin } = UserAuth(); // Access the signin function from the context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); 

  const handleSubmit = async function(e) {
    e.preventDefault();
    setError('');
    try {
      await signin(email, password); // Call signin function from the context
      navigate('/account');
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  }

  return (
    <div>
     
        <Navbar />

      {/* Main content */}
      <div className='max-w-[400px] mx-auto min-h-[600px] px-4 py-20'>
        <h1 className='text-2xl font-bold'>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className='my-4'>
            <label>Email</label>
            <div className='my-2 w-full relative rounded-2xl shadow-xl'>
              <input 
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-2 bg-primary border border-input rounded-2xl'
                type="email" 
              />
              <AiOutlineMail className='absolute right-2 top-3 text-gray-400'/>
            </div>
          </div>
          <div className='my-4'>
            <label>Password</label>
            <div className='my-2 w-full relative rounded-2xl shadow-xl'>
              <input 
                onChange={(e) => setPassword(e.target.value)}
                className='w-full p-2 bg-primary border border-input rounded-2xl' 
                type={showPassword ? "text" : "password"} 
              />
              <AiFillLock className='absolute right-2 top-3 text-gray-400'/>
              <button 
                type="button" 
                className="absolute right-10 top-3 text-gray-400"
                onClick={() => setShowPassword(!showPassword)} // Toggle showPassword state
              >
                {showPassword ? <IoEye /> : <BiSolidHide />} {/* Change button text based on showPassword state */}
              </button>
            </div>
          </div>

          <button className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl hover:shadow-2xl ease-in duration-300'>
            Sign In
          </button>
        </form>

        <p className='my-4'>
          Don't have an account? 
          <Link to='/signup' className='text-accent ml-2'> Sign Up </Link>
        </p>
      </div>

      <a href="/">
    <p className='max-sm:mt-[-1.7rem] max-sm:ml-[1.5rem] md:pl-[7.7rem] lg:hidden'><FaArrowLeft/>Back</p>
    </a>


    <Footer />
    </div>
  );
}

export default SignIn;
