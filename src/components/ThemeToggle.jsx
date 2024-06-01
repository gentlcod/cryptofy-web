import React, { useContext } from 'react'
import { HiSun, HiMoon } from 'react-icons/hi'
import { ThemeContext } from '../context/ThemeContext'

const ThemeToggle = () => {

  const {theme, setTheme} = useContext(ThemeContext)

  return (
    <div className='
    duration-300 ease-in py-2 cursor-pointer'>
      {theme === 'dark' ? (
        <div className='flex items-center'
        onClick={() => setTheme
          (theme === 'dark' ? 'light' : 'dark')}>  
          <HiSun className='text-primary  text-2xl mr-2' /> 
          </div>

      ) : ( 
      
      <div className='flex items-center cursor-pointer'
      onClick={() => setTheme
      (theme === 'dark' ? 'light' : 'dark')}>
        <HiMoon className='ease-in text-primary text-2xl mr-2' />
         </div> 
         )}
    </div>
  )
};

export default ThemeToggle