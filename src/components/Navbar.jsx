import React from 'react';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  return (
    <div className='fixed z-20 flex justify-between w-full px-12 py-4'>
      <div>Logo</div>
      <DarkModeToggle className='w-10 h-10 text-gray-700 cursor-pointer dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200' />
    </div>
  );
};

export default Navbar;
