import React, { useState } from 'react';
import { FaRegUser, FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { AiFillLock, AiOutlineMail } from 'react-icons/ai';
import { IoEye, IoEyeOff } from "react-icons/io5";
import { UserAuth } from '../context/AuthContext'; // Corrected import
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const navigate = useNavigate();
  const { signup } = UserAuth(); // Corrected usage

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (password !== repeatPassword) {
        throw new Error('Passwords do not match');
      }
      await signup(email, password, name);
      navigate('/account');
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className='max-w-[400px] mx-auto min-h-[600px] px-4 py-20'>
        <h1 className='text-2xl font-bold '>Sign Up</h1>
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
            <label>Password</label>
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
                {showPassword ? <IoEyeOff /> : <IoEye />}
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
                {showRepeatPassword ? <IoEyeOff /> : <IoEye />}
              </button>
            </div>
          </div>
          <button className='w-full my-2 p-3 bg-button 
          text-btnText rounded-2xl shadow-xl 
          hover:shadow-2xl ease-in duration-300'>
            Sign Up
          </button>
        </form>
        <p className='my-4'>
          Already have an account?
          <Link
            to='/signin'
            className='text-accent ml-2'
          >
            Sign In
          </Link>
        </p>
      </div>
      <a href="/">
        <p className='lg:hidden max-sm:mt-[-1.7rem] max-sm:ml-[1.5rem] md:pl-[7.7rem]'><FaArrowLeft />Back</p>
      </a>
      <Footer />
    </div>
  );
};

export default SignUp;
