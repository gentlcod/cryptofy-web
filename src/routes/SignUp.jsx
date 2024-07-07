import React, { useState, useEffect } from 'react';
import { FaRegUser, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { UserAuth } from '../context/AuthContext'; 

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const navigate = useNavigate();
  const { signUpWithPassword } = UserAuth(); // Access the sign up functions from the context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (password !== repeatPassword) {
        throw new Error('Passwords do not match');
      }
      await signUpWithPassword(email, password, name);
      navigate('/account');
    } catch (e) {
      setError(e.message);
    }
  };


  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  }, []);

  return (
    <div>
      <a href="/">
        <p className='max-sm:mt-[1.7rem] max-sm:ml-[1.5rem] md:pl-[7.7rem] lg:hidden sm:hidden'><FaArrowLeft/>Back</p>
      </a>
      <div className='max-w-[400px] mx-auto min-h-[600px] px-4'>
        <img 
          src='/logowithoutbg.png'
          height={65}
          width={65}
          alt='logo'
          className='ml-[150px] py-4'
        />
        <h1 className='text-2xl font-bold text-center'>Create Account</h1>
        
        {error && <p className='bg-red-300 my-2 p-3'>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className='my-4'>
            <label>Full Name</label>
            <div className='my-2 w-full relative rounded-2xl shadow-xl'>
              <input
                onChange={(e) => setName(e.target.value)}
                className='w-full p-2 bg-primary 
                border border-input rounded-2xl'
                type="text" />
              <FaRegUser className='absolute right-2 top-3 text-gray-400' />
            </div>
          </div>
          <div className='my-4'>
            <label>Email</label>
            <div className='my-2 w-full relative rounded-2xl shadow-xl'>
              <input
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-2 bg-primary 
                border border-input rounded-2xl'
                type="email" />
              <AiOutlineMail className='absolute right-2 top-3 text-gray-400' />
            </div>
          </div>
          <div className='my-4'>
            <label>Create Password</label>
            <div className='my-2 w-full relative rounded-2xl shadow-xl'>
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className='w-full p-2 bg-primary 
                border border-input rounded-2xl'
                type={showPassword ? "text" : "password"}
              />
              <AiFillLock className='absolute right-2 top-3 text-gray-400' />
              <button
                type="button"
                className="absolute right-10 top-3 text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEye /> : <IoEyeOff /> }
              </button>
            </div>
          </div>
          <div className='my-4'>
            <label>Repeat Password</label>
            <div className='my-2 w-full relative rounded-2xl shadow-xl'>
              <input
                onChange={(e) => setRepeatPassword(e.target.value)}
                value={repeatPassword}
                className='w-full p-2 bg-primary 
                border border-input rounded-2xl'
                type={showRepeatPassword ? "text" : "password"}
              />
              <AiFillLock className='absolute right-2 top-3 text-gray-400' />
              <button
                type="button"
                className="absolute right-10 top-3 text-gray-400"
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              >
                {showRepeatPassword ? <IoEye /> : <IoEyeOff /> }
              </button>
            </div>
          </div>
          <button className='w-full my-2 p-3 bg-button 
          text-btnText rounded-2xl shadow-xl 
          hover:shadow-2xl ease-in duration-300'>
            Sign Up
          </button>

          <p className='text-center bold my-2'>Or</p>
          <div className='border-b border-1px'></div>

        </form>
        <p className='my-4 text-center'>
          Already have an account?
          <Link
            to='/signin'
            className='text-accent ml-2'
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
