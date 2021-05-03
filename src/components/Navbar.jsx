import React from 'react';
import Logo from '../../assets/images/azumao_logo.svg?component';
import DarkModeToggle from './DarkModeToggle';

const Navbar = () => {
  return (
    <div className='fixed z-20 flex justify-between w-full px-12 py-4'>
      <Logo className='h-12 text-gray-700 fill-current dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200' />
      <DarkModeToggle className='w-10 h-10 text-gray-700 cursor-pointer dark:text-gray-400 hover:text-gray-600 dark:hover:text-gray-200' />
    </div>
  );
};

export default Navbar;
