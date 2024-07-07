import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext'; // Import UserAuth from context
import { FaArrowLeft } from 'react-icons/fa';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { IoEye } from "react-icons/io5";
import { BiSolidHide } from "react-icons/bi";

const SignIn = () => {
  const { signin } = UserAuth(); // Access the auth functions from the context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error state before attempting sign-in
    try {
      await signin(email, password); // Call signin function from the context
      navigate('/account');
    } catch (error) {
      setError(error.message); // Update error state with the correct error message
      console.error('Error signing in:', error); // Log the error to console for debugging
    }
  };



  return (
    <div>
      <a href="/">
        <p className='max-sm:mt-[1.7rem] max-sm:ml-[1.5rem] md:pl-[7.7rem] lg:hidden sm:hidden'><FaArrowLeft/>Back</p>
      </a>

      {/* Main content */}
      <div className='max-w-[400px] mx-auto min-h-[600px] px-4 py-7'>
        <img 
          src='/logowithoutbg.png'
          height={65}
          width={65}
          alt='logo'
          className='ml-[150px] py-4'
        />
        <br />
        <br />
        <br />

        <h1 className='text-2xl text-center font-bold'>Welcome Back</h1>

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
                {showPassword ? <IoEye /> : <BiSolidHide />} {/* Change button icon based on showPassword state */}
              </button>
            </div>
          </div>

          <button className='w-full my-2 p-3 bg-button text-btnText rounded-2xl shadow-xl hover:shadow-2xl ease-in duration-300'>
            Sign in
          </button>

          {error && <p className="text-red-500 text-center my-4">{error}</p>} {/* Display error message if there's an error */}
        </form>

        <p className='text-center bold my-2'>Or</p>
        <div className='border-b border-1px'></div>

      

        <p className='my-4 text-center'>
          New here ? 
          <Link to='/signup' className='text-accent ml-2'> Sign up </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
