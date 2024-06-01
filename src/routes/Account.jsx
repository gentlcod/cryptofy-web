import React from 'react';
import SavedCoin from '../components/SavedCoin';
import { UserAuth } from '../context/AuthContext';
import { useNavigate, Navigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Account = () => {
  const { user, loading, logout } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return (
    <>
      <Navbar />
      <div className='max-w-[1140px] mx-auto'>
        <div className='flex justify-between items-center my-12 py-8 rounded-divnavbar'>
          <div>
            <h1 className='text-2xl font-bold'>Account</h1>
            <div className='pt-4'>
              <p className='pb-2'>Welcome, {user.displayName || 'Guest' } !</p> {/* Ensure user.displayName is correctly accessed */}
              <p>{user.email}</p>
            </div>
          </div>

          <div>
            <button
              onClick={handleSignOut}
              className='border py-2 px-6 rounded-2xl shadow-lg hover:shadow-2xl'
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className='justify-between flex items-center my-12 py-8 rounded-divnavbar'>
          <div className='w-full min-h-[300px]'>
            <h1 className='text-2xl font-bold py-4'>Watch List</h1>
            <SavedCoin />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Account;
