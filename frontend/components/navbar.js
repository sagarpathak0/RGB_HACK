import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { isAuthenticated, logout } from '../components/auth'; // Import auth utility

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsLoggedIn(isAuthenticated());
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem("email")
      logout();
      router.replace('/signin');
      setIsLoggedIn(false);
    }
  };

  return (
    <div className="relative pt-10 pb-10 flex h-16 w-full font-bold py-8 text-white items-center lg:pl-20">
      
      <div className='flex w-1/3 lg:w-1/2 text-3xl items-center font-serif'>
        <Image src='/assets/hathi.png' width={100} height={30} alt='Logo' />
        <Link href='/'><span className='hidden md:block'>PiRUS</span></Link>
      </div>

      <div className='absolute right-4 top-12 lg:hidden'>
        <button onClick={toggleMenu} className='text-white'>
          {isOpen ? <XMarkIcon className='w-6 h-6' /> : <Bars3Icon className='w-6 h-6' />}
        </button>
      </div>

      <div className='hidden lg:flex w-2/3 lg:w-1/2 justify-around items-center lg:justify-around'>
        <div><Link href='notes'>Notes</Link></div>
        <div><Link href='cont'>Contact</Link></div>
        {/* <div><Link href='teams'>Team</Link></div> */}
        {isLoggedIn ? (
          <div>
            <button onClick={handleLogout} className="px-8 py-2 rounded-md bg-red-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-red-500">
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link href='signin'>
              <button className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
                Sign In
              </button>
            </Link>
          </div>
        )}
      </div>

      <div className={`lg:hidden fixed inset-0 bg-black bg-opacity-75 z-50 transition-transform transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className='flex flex-col items-center pt-20 space-y-4'>
          <Link href='notes' className='text-white text-2xl' onClick={toggleMenu}>Notes</Link>
          <Link href='#' className='text-white text-2xl' onClick={toggleMenu}>Contact</Link>
          {isLoggedIn ? (
            <button onClick={handleLogout} className="px-8 py-2 rounded-md bg-red-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-red-500">
              Logout
            </button>
          ) : (
            <Link href='signin'>
              <button className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
                Sign In
              </button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
